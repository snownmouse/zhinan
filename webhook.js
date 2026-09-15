const http = require("http");
const crypto = require("crypto");
const { spawn } = require("child_process");
const SECRET = "zhinan_webhook_9c4f2a7b3e1d8";
const PORT = 9111;
const PROJ = "/opt/zhinan";
const server = http.createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/deploy") {
    res.writeHead(404); res.end("not found"); return;
  }
  let body = "";
  req.on("data", c => { body += c; });
  req.on("end", () => {
    const sig = req.headers["x-hub-signature-256"];
    const expected = "sha256=" + crypto.createHmac("sha256", SECRET).update(body).digest("hex");
    if (!sig || sig.length !== expected.length) { res.writeHead(403); res.end("invalid"); return; }
    try {
      if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) { res.writeHead(403); res.end("invalid"); return; }
    } catch (e) { res.writeHead(403); res.end("invalid"); return; }
    const child = spawn("git", ["pull", "--ff-only"], { cwd: PROJ, detached: true, stdio: "ignore" });
    child.unref();
    res.writeHead(202); res.end("deploy triggered");
  });
});
server.listen(PORT, "0.0.0.0", () => console.log("webhook listening on " + PORT));
