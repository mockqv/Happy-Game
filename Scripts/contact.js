document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const enviado = document.getElementById("enviado");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensagem = document.getElementById("mensagem").value.trim();
  
      if (nome === "" || email === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      enviado.classList.add("show");
  
      form.reset();
  
      setTimeout(() => {
        enviado.classList.remove("show");
      }, 5000);
    });
  });
  