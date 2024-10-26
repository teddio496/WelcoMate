export default async function handler(req, res) {
  try {
    res.setHeader('Set-Cookie', [
      `adminAccessToken=; Path=/; Max-Age=0`,
      `adminRefreshToken=; Path=/; Max-Age=0` 
    ]);
    
    return res.status(200).json({ message: "Logout successful" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Something went wrong during logout" });
  }
}
