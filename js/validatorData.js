$(document).ready(function () {
    // Aplica máscara de moeda nos inputs financeiros
    Inputmask("currency", {
        radixPoint: ",",
        groupSeparator: ".",
        allowMinus: false,
        autoGroup: true,
        prefix: "R$ ",
        rightAlign: false,
        digits: 2
    }).mask(".money");

    // Aplica máscara no telefone
    Inputmask("(99) 99999-9999").mask(".phone");

    // Evita valores negativos nos inputs numéricos
    $(".number").on("input", function () {
        if (parseInt($(this).val()) < 0) {
            $(this).val(0);
        }
    });

    // Validação do formulário antes de abrir o modal
    $("#calculadoraForm").submit(function (e) {
        e.preventDefault();

        let isValid = true;
        $(this).find("input, select").each(function () {
            if (!$(this).val() || $(this).val() === "Selecione") {
                isValid = false;
                $(this).addClass("is-invalid"); // Adiciona borda vermelha se inválido
            } else {
                $(this).removeClass("is-invalid");
            }
        });

        if (!isValid) {
            alert("Por favor, preencha todos os campos corretamente!");
            return;
        }

        // Se estiver tudo válido, abre o modal
        $("#imageModal").modal("show");
    });
});
