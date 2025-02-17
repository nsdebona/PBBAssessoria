$(document).ready(function () {
    $(".open-modal").click(function (e) {
        e.preventDefault();

        // Captura os valores preenchidos no formulário e faz as validações
        let valorFinanciado = parseFloat($("#valorFinanciado").val().replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
        let quantParcelas = parseInt($("#quantParcelas").val()) || 0;
        let parcelasPagas = parseInt($("#parcelasPagas").val()) || 0;
        let valorPrestacao = parseFloat($("#valorPrestacao").val().replace(/[^0-9,]/g, '').replace(',', '.')) || 0;

        // Validações
        if (valorFinanciado <= 0 || isNaN(valorFinanciado)) {
            alert("Por favor, insira um valor financiado válido.");
            return;
        }

        if (quantParcelas <= 0 || isNaN(quantParcelas)) {
            alert("Por favor, insira a quantidade de parcelas válidas.");
            return;
        }

        if (parcelasPagas < 0 || parcelasPagas > quantParcelas || isNaN(parcelasPagas)) {
            alert("O número de parcelas pagas não pode ser maior que o número total de parcelas.");
            return;
        }

        if (valorPrestacao <= 0 || isNaN(valorPrestacao)) {
            alert("Por favor, insira um valor de prestação válido.");
            return;
        }

        let valorPago = parcelasPagas * valorPrestacao;
        let valorDevido = valorFinanciado - valorPago;

        if (valorPago > valorDevido) {
            alert("O valor pago não pode ser maior que o valor devido.");
            return;
        }

        let parcelasAbertas = quantParcelas - parcelasPagas;

        $("#modalValorTotal").text(valorFinanciado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        $("#modalParcelasAbertas").text(parcelasAbertas);
        $("#modalValorPago").text(valorPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        $("#modalValorDevido").text(valorDevido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

        // Calcula novo valor e nova parcela corrigidos
        let novoValor = valorDevido * 0.35;
        let novoValorParcelas = valorPrestacao * 0.62;

        novoValor = novoValor.toFixed(2);
        novoValorParcelas = novoValorParcelas.toFixed(2);

        $("#novoValorDevido").text(novoValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        $("#novoValorParcelas").text(novoValorParcelas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

        let whatsappMessage = encodeURIComponent(`Olá, gostaria de mais informações sobre a revisão da minha dívida. 
                O novo valor calculado foi de ${novoValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.`);
        let whatsappLink = `https://wa.me/5551996537886?text=${whatsappMessage}`;

        $("#whatsappLink").attr("href", whatsappLink);
        $(this).prop("disabled", true);

        $("#imageModal").modal("show");

        $("#fecharModal").click(function () {
            $("#imageModal").modal("hide");
            $(".open-modal").prop("disabled", false);  
        });
    });
});
