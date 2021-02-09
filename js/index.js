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
function delete_list(id){
    
    lists.splice(id,1);

    if(lists.length > 0){
        update_view(lists[0].id);
        show_lists();
    }else{
        update_view("#");
        show_lists();
    }
}
function show_lists(){
    if(lists.length > 0){
        $("#lists").empty();
        $(lists).each(function(i){
            $("#lists").append('<li class="list" onclick="select_list(this)"><div><span id="'+lists[i].id+'">'+lists[i].list_name+'</span></div></li>');
        });
    }else{
        $("#lists").empty();
    }
}
function select_list(event){
    let id = $(event).find('span').attr('id');

    update_view(id);
}
function update_view(list_id){
    let id;

    if(list_id == "#"){
        $('.header').fadeOut();
        $(".main-content .itens").empty();
    }else{
        $(lists).each(function(e){
            if(lists[e].id == list_id){
                id = e;
            }
        });

        let list_name = lists[id].list_name;
        
        $('.header').fadeIn();
        $('.main-content h1').html(list_name+'<i class="fas fa-trash-alt" onclick="delete_list('+id+')"></i>');
        $('.main-content h1').attr('id',id);
        show_itens(id);
    }

    console.log("update");
}
function add_item(id,item_value){
    let item_id = itemId;
    let item_status = false;
    let newItem = {id: item_id, value: item_value, status: item_status}
    
    lists[id].itens.push(newItem);
    itemId++;
    update_view(lists[id].id);
}
function delete_item(list,item){
    lists[list].itens.splice(item,1);

    show_itens(list);

    $(lists).each(function(i){
        if($(lists)[i].id == list){
            update_view(list);
        }
    });
}
function show_itens(id){
    $(".main-content .itens").empty();

    if(lists[id].itens.length > 0){
        $(lists[id].itens).each(function(i){
            let status;
            let line_through;
            if(lists[id].itens[i].status == true){status = "checked"; line_through = "style='text-decoration: line-through;'";}
            $(".main-content .itens").append('<li><i class="fas fa-trash-alt" onclick="delete_item('+id+','+i+')"></i><input type="checkbox" onchange="check_itens(event)" '+status+' id="'+lists[id].itens[i].id+'" class="'+id+'" '+lists[id].itens[i].status+' /><span '+line_through+'>'+lists[id].itens[i].value+'</span></li>');
        });
    }
}
function check_itens(event){
    let id = event.target.className;
    let item_id = event.target.id;
    let status = event.target.checked;

    $(lists[id].itens).each(function(i){
        if(lists[id].itens[i].id == item_id){
            lists[id].itens[i].status = status;
        }
    });

    show_itens(id);
    update_view(id);
}
function modal_animation(action){
    if(action == "open"){
        $('.modal-bg').fadeIn(400,function(){
            $("#modal").fadeIn(400,function(){
                $("#list-name").focus();
            });
        });
    }
    else if(action == "close"){
        $('#modal').fadeOut(200,function(){
            $(".modal-bg").fadeOut(200);
        });
    }
}


































$(document).ready(function(){
    //CREATE LIST
    $('#add-list').click(function(){
        modal_animation("open");
    }); 
    $('#btn-create-list').click(function(e){
        e.preventDefault();

        let list_name = $("#list-name").val();

        create_list(list_name);

        $("#list-name").val("");
        
        modal_animation("close");
        
        show_lists();
    });
    $('.modal-bg').click(function(){
        modal_animation("close");
    });



    //ADD ITEM
    $('#btn-add-item').click(function(e){
        e.preventDefault();
        var id = $('.main-content h1').attr("id");
        var item_value = $('#item-value').val();
        
        add_item(id,item_value,);
        
        $('#item-value').val("");
    });
});