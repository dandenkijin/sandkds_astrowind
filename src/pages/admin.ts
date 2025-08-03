// This file handles the /admin redirect
export function get() {
  return new Response(null, {
    status: 301,
    headers: {
      'Location': '/admin/index.html'
    }
  });
}
