;(function($){

	var app = {

		apiUrl: 'https://api.github.com/search/',
		$users: $('.users'),

		request: function(type, name, page, success_callback) {

			var app = this;

			var request = {

				url: this.apiUrl + type + '?q=' + name + '+in:login&page=' + page,
				type: 'GET',
				crossDomain: true,
				cache: false,
				dataType: 'json',

				success: function(res){
					success_callback(res, page);
				}

			};
			return $.ajax(request);
		},

		renderUsers: function(res, page, name){

			var items = res.items;
			var total_count = res.total_count;
			pages = Math.ceil(total_count / 30);
			currentPage = page;

			app.$users.html('<p class="users__total">Всего найдено: ' + total_count + ' пользователей</p>');
 
			if (items.length) {
				for ( key in items ) {
					app.$users.append(app.buildTemplate(items[key]));
				}
				app.$users.append(app.buildNav(currentPage, name, pages));
			} else {
				app.$users.html('Пусто как то :(');
			}

		},

		buildTemplate: function(item){
			var template = '<div class="users__item">';
			template += '<div class="users__avatar"><img src="' + item.avatar_url + '" alt=""></div>';
			template += '<div class="users__content"><div class="users__name">' + item.login + '</div>';
			template += '<a class="users__link" href="' + item.html_url + '">' + item.html_url + '</a>';
			template += '</div></div>';
			return template;
		},

		buildNav: function(currentPage, name, pages) {
			var template = '<div class="users__nav">';
			if ( currentPage > 1 ) {
				template += '<a class="users__nav-link users__prev" data-name="' + name + '" data-page="' + (currentPage - 1) + '" href="#">Назад!</a>';
			};
			template += '<p class="users__current">Страница ' + currentPage + ' из ' + pages + '</p>';
			if ( currentPage < pages ) {
				template += '<a class="users__nav-link users__next" data-name="' + name + '" data-page="' + (currentPage + 1) + '" href="#">Вперед!</a>';
			};
			template += '</div>';
			return template;
		},

		handlers: function(){
			$(document)

				.on('submit', 'form[name="search"]', function(e){
					e.preventDefault();
					var name = $(this).find('input[name="username"]').val();
					if (name) {
						var page = 1;
						app.request('users', name, page, function(res){
							app.renderUsers(res, page, name);
						});
					} else {
						app.$users.html('Пусто как то :(');
					}
				})
				.on('click', '.users__nav-link', function(e){
					e.preventDefault();
					var name = $(this).data('name');
					var page = $(this).data('page');
					app.request('users', name, page, function(res){
						app.renderUsers(res, page, name);
					});
				});
		}
	}

	$(function(){
		app.handlers();
	});

})(jQuery);