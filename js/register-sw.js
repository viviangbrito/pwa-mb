// Verifica se o navegador suporta Service Workers
if ('serviceWorker' in navigator) {  
  // Espera o carregamento completo da página antes de registrar o Service Worker
  window.addEventListener('load', async () => {  
    try {
      // Tenta registrar o service-worker.js na raiz do site
      const registration = await navigator.serviceWorker.register('/service-worker.js');  
      console.log('[Service Worker] Registrado com sucesso:', registration);

      // Verifica se há um Service Worker esperando para ser ativado (atualização pendente)
      if (registration.waiting) {  
        console.log("[Service Worker] Nova versão aguardando ativação.");
      }

      // Dispara quando uma nova versão do Service Worker é encontrada
      registration.onupdatefound = () => {  
        console.log("[Service Worker] Nova versão encontrada! Atualizando...");
        
        // Obtém a nova versão do Service Worker em processo de instalação
        const newWorker = registration.installing;  
        
        // Observa mudanças no estado do novo Service Worker
        newWorker.onstatechange = () => {  
          if (newWorker.state === 'installed') {  
            console.log("[Service Worker] Atualização concluída!");
          }
        };
      };

    } catch (error) {
      // Captura e exibe erros caso o registro falhe
      console.error('[Service Worker] Falha ao registrar:', error);  
    }
  });
}

