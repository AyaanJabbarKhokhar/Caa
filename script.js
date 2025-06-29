document.getElementById('caaForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const domain = document.getElementById('domain').value.trim();
  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = '<p>Checking CAA records...</p>';

  try {
    // 1. DNS CAA Record Check
    const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=CAA`);
    const data = await response.json();

    let html = `<h3>Result for ${domain}:</h3>`;

    if (!data.Answer || !Array.isArray(data.Answer)) {
      html += `<p class="vuln">VULNERABILITY FOUND</p>
               <p style="color: #c62828;">No CAA records found.</p>`;
    } else {
      html += `<p class="safe">✅ CAA records found</p><ul>`;
      data.Answer.forEach(record => {
        html += `<li>${record.data}</li>`;
      });
      html += '</ul>';
    }

    resultDiv.innerHTML = html;

    // 2. Submit to backend
    await fetch('https://your-backend-url.onrender.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain })
    });

  } catch (err) {
    resultDiv.innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
  }
});
