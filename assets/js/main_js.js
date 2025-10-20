$(function () {

    $("body").on("click","#qc_submit_reg_form",function(){

        $("#qc_errors_block").hide();
        $("#qc_errors_block").html("");

        var data = $("#qc_contacts").serializeArray();

        var check_rules = false;
        if($("#exampleCheck1").is(":checked"))
        {
            check_rules = true;
        }

        console.log(data);

        var errors = [];

        if(!check_rules)
        {
            errors.push("Не подтверждено согласие на обработку персональных данных");
        }

        if(errors.length < 1)
        {
            $.post("/mailer.php",{data:data})
                .success(function(data){
                    var ans = JSON.parse(data);
                    if(ans.status === 'OK')
                    {
                        //console.log(ans);
                        errors.push(ans.text);
                        qc_form_errors(errors);
                        $('#formModal').modal('hide');
                        $('#formModalOk').modal('show');
                        setTimeout(function(){
                            $('#formModalOk').modal('hide');
                        }, 5000);
                    }
                    else
                    {
                        errors.push(ans.text);
                        qc_form_errors(errors);
                    }
                })
                .error(function(xhr, textStatus, errorThrown) {
                    errors.push("Ошибка соединения");
                    qc_form_errors(errors);
                });
        }
        else
        {
            qc_form_errors(errors);
        }

    });

    function qc_form_errors(errors)
    {
        $.each(errors,function(ek,ev){
            $("#qc_errors_block").append('<div class="qc_error">'+ev+'</div>')
        });
        $("#qc_errors_block").show();
    }

    $("body").on("click",".mob_menu .menu_item a",function(){
        $(".hamb").trigger("click");
    });

});
