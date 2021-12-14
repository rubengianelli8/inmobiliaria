// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const data = {
    id: 1,
    name: "Demo",
    email: "demo@tiarg.com.ar",
  };
  res.status(200).json(data);
}
