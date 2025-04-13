document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("feedbackForm");
    const mensagem = document.getElementById("mensagemSucesso");
    const formContainer = document.querySelector(".col-md-6.bg-white");
    const feedbackCard = document.createElement("div");
  
    feedbackCard.innerHTML = `
      <div class="text-center p-4">
        <h3 class="text-success">🎉 Obrigado pelo seu feedback!</h3>
        <p>Ficamos felizes com sua colaboração.</p>
        <button id="novoFeedbackBtn" class="btn btn-outline-info mt-3">Enviar outro feedback</button>
      </div>
    `;
    feedbackCard.style.display = "none";
    formContainer.appendChild(feedbackCard);
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      form.style.display = "none";
      mensagem.style.display = "block";
      
      setTimeout(() => {
        mensagem.style.display = "none";
        feedbackCard.style.display = "block";
      }, 2000);
    });
  
    formContainer.addEventListener("click", (e) => {
      if (e.target.id === "novoFeedbackBtn") {
        feedbackCard.style.display = "none";
        form.style.display = "block";
      }
    });
  });