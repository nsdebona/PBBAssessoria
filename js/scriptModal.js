$(document).ready(function () {
    // Desabilitar o botão inicialmente
    $("#recalcular").prop("disabled", true);

    $(".open-modal").click(function (e) {
        e.preventDefault();

        // Captura os valores preenchidos no formulário
        let valorFinanciado = parseFloat($("#valorFinanciado").val().replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
        let quantParcelas = parseFloat($("#quantParcelas").val()) || 0;
        let parcelasPagas = parseFloat($("#parcelasPagas").val()) || 0;
        let valorPrestacao = parseFloat($("#valorPrestacao").val().replace(/[^0-9,]/g, '').replace(',', '.')) || 0;

        let valorPago = parcelasPagas * valorPrestacao;
        let valorDevido = valorFinanciado - valorPago;
        let jurosAnual = 6.48;
        let parcelasAbertas = quantParcelas - parcelasPagas;

        // Exibe os valores no modal
        $("#modalValorTotal").text(valorFinanciado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
        $("#modalParcelasAbertas").text(parcelasAbertas);
        $("#modalJurosAnual").text(jurosAnual + "%");
        $("#modalValorPago").text(valorPago.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
        $("#modalValorDevido").text(valorDevido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));

        // Reseta os campos de novo valor e botão de contato ao abrir o modal
        $("#resultadoDivida").hide();
        $("#botaoContato").hide();

        // Remove eventos anteriores e adiciona o evento para recalcular a dívida
        $("#recalcular").off("click").one("click", function () {
            // Validação da taxa de juros
            let taxaJuros = parseFloat($("#taxaJuros").val().replace(',', '.')) || 0;

            // Verifica se a taxa de juros é um número válido e se está dentro do intervalo de 0 a 100
            if (isNaN(taxaJuros) || taxaJuros < 0 || taxaJuros > 100) {
                // Se não for válido, exibe uma mensagem de erro
                alert("Por favor, insira uma taxa de juros válida entre 0 e 100.");
                return;  // Impede a continuação do cálculo e envio de e-mail
            }

            let valorDevidoModal = parseFloat($("#modalValorDevido").text().replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
            
            // Ajuste no cálculo do novo valor devido com juros aplicados sobre as parcelas restantes
            let jurosMensal = (Math.pow(1 + jurosAnual / 100, 1 / 12)) - 1;
            let novoValor = valorDevidoModal * Math.pow(1 + jurosMensal, parcelasAbertas);  // Aplicando juros compostos

            novoValor = novoValor.toFixed(2);
            
            // Atualiza o novo valor devido no modal
            $("#novoValorDevido").text(novoValor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
            
            // Exibe o novo valor e o botão de contato
            $("#resultadoDivida").fadeIn();
            $("#botaoContato").fadeIn();

            // Gera o link do WhatsApp
            let whatsappMessage = encodeURIComponent(`Olá, gostaria de mais informações sobre a revisão da minha dívida. 
                O novo valor calculado foi de ${novoValor.toLocaleString('pt-BR', 
                    {style: 'currency', currency: 'BRL'})}.`);
            let whatsappLink = `https://wa.me/5551996537886?text=${whatsappMessage}`;
            
            // Atualiza o botão de contato
            $("#whatsappLink").attr("href", whatsappLink);

            // ** Parte de envio de e-mail (comentada) **
            /*
            // Dados a serem enviados no e-mail
            let emailSubject = "Revisão da Dívida - Cálculo do Novo Valor";
            let emailBody = `Detalhes da dívida:\n\n
                Valor Financiado: ${valorFinanciado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}\n
                Parcelas Pagas: ${parcelasPagas}\n
                Valor da Prestação: ${valorPrestacao.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}\n
                Valor Pago: ${valorPago.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}\n
                Valor Devido: ${valorDevido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}\n
                Taxa de Juros: ${taxaJuros}%\n
                Novo Valor Devido: ${novoValor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`;

            // Enviar e-mail (utilizando o serviço de envio de e-mail de sua escolha, ex: EmailJS, SMTP, etc.)
            Email.send({
                SecureToken: "YOUR_SECURE_TOKEN",  // Substitua pelo seu token de segurança
                To: 'nsdebona@gmail.com',
                From: 'seuemail@example.com',   // Substitua pelo seu e-mail
                Subject: emailSubject,
                Body: emailBody
            }).then(
                message => alert("E-mail enviado com sucesso!")
            ).catch(
                error => alert("Erro ao enviar e-mail: " + error)
            );
            */
        });

        // Abre o modal
        $("#imageModal").modal("show");
    });

    // Verificação da taxa de juros ao digitar
    $("#taxaJuros").on("input", function () {
        let taxaJuros = parseFloat($(this).val().replace(',', '.'));

        // Se a taxa de juros for válida (número entre 0 e 100), habilita o botão
        if (!isNaN(taxaJuros) && taxaJuros >= 0 && taxaJuros <= 100) {
            $("#recalcular").prop("disabled", false);
        } else {
            // Se não for válida, desabilita o botão
            $("#recalcular").prop("disabled", true);
        }
    });
});
