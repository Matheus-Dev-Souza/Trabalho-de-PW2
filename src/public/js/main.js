document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('cidade', document.getElementById('cidade').value);
    formData.append('foto', document.getElementById('foto').files[0]);
  
    const response = await fetch('/api/cadastroPlaca', {
      method: 'POST',
      body: formData
    });
  
    const result = await response.json();
    document.getElementById('result').textContent = result.message;
  });
  
  document.getElementById('consultaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const placa = document.getElementById('placa').value;
  
    const response = await fetch(`/api/consulta/${placa}`);
    const result = await response.json();
  
    if (result.message) {
      document.getElementById('result').textContent = result.message;
    } else {
      document.getElementById('result').textContent = JSON.stringify(result);
    }
  });
  
  document.getElementById('relatorioForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const cidade = document.getElementById('cidadeRelatorio').value;
  
    window.location.href = `/api/relatorio/cidade/${cidade}`;
  });
  