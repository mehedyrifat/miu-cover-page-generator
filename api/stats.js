
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Same-origin request check
  const origin = req.headers.origin;
  const host = req.headers.host;

  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return res.status(403).json({ error: 'Forbidden' });
      }
    } catch {
      return res.status(403).json({ error: 'Invalid origin' });
    }
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return res.status(500).json({
      error: 'Database configuration missing'
    });
  }

  // Remove trailing slashes
  const baseUrl = redisUrl.replace(/\/+$/, '');

  async function redisCommand(command, key) {
    const response = await fetch(
      `${baseUrl}/${command}/${encodeURIComponent(key)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${redisToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Redis request failed');
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.result;
  }

  try {
    // Read all statistics
    if (req.method === 'GET') {
      const [visitors, downloads, installs] = await Promise.all([
        redisCommand('get', 'visitors'),
        redisCommand('get', 'downloads'),
        redisCommand('get', 'installs')
      ]);

      return res.status(200).json({
        visitors: Number(visitors || 0),
        downloads: Number(downloads || 0),
        installs: Number(installs || 0)
      });
    }

    // Read POST body
    let body = req.body;

    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          error: 'Invalid JSON body'
        });
      }
    }

    const allowedTypes = ['visitors', 'downloads', 'installs'];
    const type = body?.type;

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        error: 'Invalid counter type'
      });
    }

    // Increase selected counter
    const total = await redisCommand('incr', type);

    return res.status(200).json({
      success: true,
      total: Number(total)
    });

  } catch (error) {
    console.error('Stats API error:', error);

    return res.status(500).json({
      error: 'Could not update statistics'
    });
  }
}
