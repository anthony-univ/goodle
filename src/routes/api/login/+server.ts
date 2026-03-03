import type { RequestHandler } from '@sveltejs/kit';
import { query } from '$lib/db'; // Import from lib folder
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { username, password }: { username: string; password: string } = await request.json();
    
    // Fetch user data from the database
    const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
    
    if (rows.length > 0) {
      const user = rows[0];
      // Compare the provided password with the stored hashed password
      console.log(user.password);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (isPasswordValid) {
        return new Response(
          JSON.stringify({ success: true }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
    
    return new Response(
      JSON.stringify({ success: false }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

