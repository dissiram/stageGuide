import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://qyxmdpkieqvvowzupdug.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRmYjE5M2E5LWQyMjktNDI4MS04MzM5LTE3MTk4NTk2MmZkNiJ9.eyJwcm9qZWN0SWQiOiJxeXhtZHBraWVxdnZvd3p1cGR1ZyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc0MzU5NTY2LCJleHAiOjIwODk3MTk1NjYsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.CybdX4jluGhlt0_hLC3JqeJNeEt0Yk1JM9ZFtZNUt9U';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };