$(document).ready(function () {
    // Desabilitar o botão inicialmente
    $("#recalcular").prop("disabled", false);

    $(".open-modal").click(function (e) {
        e.preventDefault();

        // Captura os valores preenchidos no formulário
        let valorFinanciado = parseFloat($("#valorFinanciado").val().replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
        let quantParcelas = parseFloat($("#quantParcelas").val()) || 0;
        let parcelasPagas = parseFloat($("#parcelasPagas").val()) || 0;
        let valorPrestacao = parseFloat($("#valorPrestacao").val().replace(/[^0-9,]/g, '').replace(',', '.')) || 0;

        let valorPago = parcelasPagas * valorPrestacao;
        let valorDevido = valorFinanciado - valorPago;
        let parcelasAbertas = quantParcelas - parcelasPagas;

        // Exibe os valores no modal
        $("#modalValorTotal").text(valorFinanciado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
        $("#modalParcelasAbertas").text(parcelasAbertas);
        $("#modalValorPago").text(valorPago.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
        $("#modalValorDevido").text(valorDevido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));

        // Reseta os campos de novo valor e botão de contato ao abrir o modal
        $("#resultadoDivida").hide();
        $("#resultadoParcelas").hide();
        $("#botaoContato").hide();

        // Remove eventos anteriores e adiciona o evento para recalcular a dívida
        $("#recalcular").off("click").one("click", function () {
            let novoValor = valorDevido * 0.52; // Novo valor devido (redução de 48%)
            let novoValorParcelas = valorPrestacao * 0.38; // Novo valor da prestação (redução de 52%)

            // Formata os valores para duas casas decimais
            novoValor = novoValor.toFixed(2);
            novoValorParcelas = novoValorParcelas.toFixed(2);

            // Atualiza os valores no modal
            $("#novoValorDevido").text(novoValor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
            $("#novoValorParcelas").text(novoValorParcelas.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));

            // Exibe os resultados e o botão de contato
            $("#resultadoDivida").fadeIn();
            $("#resultadoParcelas").fadeIn();
            $("#botaoContato").fadeIn();
  
            // Gera o link do WhatsApp
            let whatsappMessage = encodeURIComponent(`Olá, gostaria de mais informações sobre a revisão da minha dívida. 
                O novo valor calculado foi de ${novoValor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}.`);
            let whatsappLink = `https://wa.me/5551996537886?text=${whatsappMessage}`;

            // Atualiza o botão de contato
            $("#whatsappLink").attr("href", whatsappLink);
            $(this).prop("disabled", true);
        });

        // Abre o modal
        $("#imageModal").modal("show");

        // fechar o modal
        $("#fecharModal").click(function () {
            $("#imageModal").modal("hide");
        });
    });

    // Habilita o botão ao detectar qualquer entrada
    $("#taxaJuros").on("input", function () {
        $("#recalcular").prop("disabled", false);
    });
});
