export async function onRequestPost(context) {
  const { DB } = context.env;
  const { title, content, category } = await context.request.json();

  // 将用户发布的信息存入数据库
  await DB.prepare("INSERT INTO posts (title, content, category) VALUES (?, ?, ?)")
    .bind(title, content, category)
    .run();

  return Response.json({ success: true, message: "发布成功！" });
}

export async function onRequestGet(context) {
  const { DB } = context.env;
  // 从数据库读取信息，按发布时间倒序排列
  const { results } = await DB.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();
  return Response.json(results);
}
