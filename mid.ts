// import { NextRequestWithAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// export { default } from "next-auth/middleware"

// export const config = {
//     matcher: ['/dashboard'],
//   };
  
//   const withAuth = async (req: NextRequestWithAuth) => {
  
//     const token = await getToken({ req });
//     console.log("token -> ", token);    
  
//     if (!token) {
//       return NextResponse.redirect(new URL('/invalidsession', req.url));
//     }
  
//     const user = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/api/user?token=${token.jwtToken}`,
//     );
  
//     const json = await user.json();
//     if (!json.user) {
//       return NextResponse.redirect(new URL('/invalidsession', req.url));
//     }
//   };
  
//   export async function middleware(req: NextRequestWithAuth) {
//     return await withAuth(req);
//   }
  
//   export default withAuth;
