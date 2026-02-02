import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-9d0ac4f2/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-9d0ac4f2/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Sign up error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Sign up exception:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// Save quiz result endpoint (requires auth)
app.post("/make-server-9d0ac4f2/save-result", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized - please sign in' }, 401);
    }

    const { answers, degree } = await c.req.json();
    
    if (!answers || !degree) {
      return c.json({ error: 'Answers and degree are required' }, 400);
    }

    // Create a unique key for this quiz result
    const timestamp = Date.now();
    const resultKey = `quiz_result:${user.id}:${timestamp}`;
    
    const resultData = {
      userId: user.id,
      userEmail: user.email,
      userName: user.user_metadata?.name,
      answers,
      degree,
      timestamp,
      createdAt: new Date().toISOString()
    };

    await kv.set(resultKey, resultData);

    return c.json({ success: true, resultId: timestamp });
  } catch (error) {
    console.log('Save result error:', error);
    return c.json({ error: 'Failed to save quiz result' }, 500);
  }
});

// Get user's quiz history endpoint (requires auth)
app.get("/make-server-9d0ac4f2/history", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      return c.json({ error: 'Unauthorized - please sign in' }, 401);
    }

    // Get all quiz results for this user
    const prefix = `quiz_result:${user.id}:`;
    const results = await kv.getByPrefix(prefix);

    // Sort by timestamp (newest first)
    const sortedResults = results.sort((a, b) => b.timestamp - a.timestamp);

    return c.json({ results: sortedResults });
  } catch (error) {
    console.log('Get history error:', error);
    return c.json({ error: 'Failed to get quiz history' }, 500);
  }
});

Deno.serve(app.fetch);