var lists = [];
var listId = 0;
var itemId = 0;

function create_list(list_name){
    let id = listId;
    
    let newList = {id: id, list_name: list_name,itens: []};
    
    lists.push(newList);
    listId++;
    update_view(id);
}

function show_lists(){
    if(lists.length > 0){
        $("#lists").empty();
        $(lists).each(function(i){
            $("#lists").append('<li class="list" onclick="select_list(this)"><div><span id="'+lists[i].id+'">'+lists[i].list_name+'</span></div></li>');
        });
    }
}

function select_list(event){
    let id = $(event).find('span').attr('id');

    update_view(id);
}

function add_item(list_id,item_value){
    let item_id = itemId;
    let item_status = false;
    let newItem = {id: item_id, value: item_value, status: item_status}
    
    lists[list_id].itens.push(newItem);
    itemId++;
    update_view(list_id);
}

function show_itens(list_id){
    $(".main-content .itens").empty();
    if(lists[list_id].itens.length > 0){
        $(lists[list_id].itens).each(function(i){
            let status = "";
            let line_through = "";
            if(lists[list_id].itens[i].status == true){status = "checked"; line_through = "style='text-decoration: line-through;'";}
            $(".main-content .itens").append('<li><input type="checkbox" onchange="check_itens(event)" '+status+' id="'+lists[list_id].itens[i].id+'" class="'+lists[list_id].id+'" '+lists[list_id].itens[i].status+' /><span '+line_through+'>'+lists[list_id].itens[i].value+'</span></li>');
        });
    }
}

function check_itens(event){
    let list_id = $(event)[0].className;
    let item_id = $(event)[0].id;
    let status = $(event)[0].checked;

    $(lists[list_id].itens).each(function(i){
        if(lists[list_id].itens[i].id == item_id){
            lists[list_id].itens[i].status = status;
        }
    });

    show_itens(list_id);
}

function update_view(list_id){
    let list_name = lists[list_id].list_name;
    $('.main-content h1').html(list_name);
    $('.main-content h1').attr('id',list_id);

    if($('.main-content h1').html().length > 0){
        $('.add-item').css('display','block');
    }
    
    show_itens(list_id);
}

function modal_animation(action){
    if(action == "open"){

    }
    else if(action == "close"){
        $('#modal').fadeOut(200,function(){
            $(".modal-bg").fadeOut(200);
        });
    }
}

$(document).ready(function(){

    // ABRE O MODAL PARA CRIAR A LISTA
    $('#add-list').click(function(){
        $('.modal-bg').fadeIn(400,function(){
            $("#modal").fadeIn(400,function(){
                $("#list-name").focus();
            });
        });
    }); 

    // CRIA UMA NOVA LISTA
    $('#btn-create-list').click(function(){
        let list_name = $("#list-name").val();

        create_list(list_name);

        $("#list-name").val("");
        
        modal_animation("close");
        
        show_lists();
    });

    // CLOSE MODAL
    $('.modal-bg').click(function(){
        modal_animation("close");
    });

    // CRIA UM NOVO ITEM NA LISTA ATUAL
    $('#btn-add-item').click(function(){
        var list_id = $('.main-content h1').attr("id");
        var item_value = $('#item-value').val();
        
        add_item(list_id,item_value,);
        
        $('#item-value').val("");
    });
});