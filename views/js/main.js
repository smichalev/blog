function remove(id){
    if (confirm("Вы уверены что хотите удалить данную статью? ЭТО ДЕЙСТВИЕ БЕЗВОЗВРАТНО!")) {
      location.href='/delete/'+id;
    }
}
function edit(id){
      location.href='/edit/'+id;
}
document.getElementById('logo').onclick = function(){
     document.location.href = '/';
}
if(document.getElementById('add') !=null){
    document.getElementById('add').onclick = function(){
        document.location.href = '/add';
    }
}
document.getElementById('addComment').onclick = function(){
        var modal = document.createElement('div');
        modal.id="modal";
        document.body.appendChild(modal);
        var popup = document.createElement('div');
        popup.id="popup";
        popup.innerHTML = "<h2>Добавить комментарий <span id=\"closeWindow\"><i class=\"fas fa-times\"></i></span></h2><form method=\"post\" class=\"comment\"><input type=\"text\" name=\"author\" placeholder=\"Ваше имя\"><textarea name=\"content\" cols=\"30\" rows=\"10\" style=\"min-height: 60px; width: 387px; resize: vertical;\" placeholder=\"Текст комментария\"></textarea><br><input type=\"submit\" value=\"Отправить\" class=\"btn post\"></form>";
        modal.appendChild(popup);
        clear();
}
function clear(){
    document.getElementById('closeWindow').onclick = function(){
            document.getElementById('modal').remove();
    }
}
