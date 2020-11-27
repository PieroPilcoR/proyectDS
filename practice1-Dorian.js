'use strict'
//window.onload=function(){
	const form = document.querySelector('#obtain');
	class Works{
		constructor(titulo, day, color, id){
			this.title = titulo;
			this.day = day;
			this.color = color;
			this.id = id;
		}
	}
	function elegant(word){
		return word[0].toUpperCase() + word.slice(1);
	}
	function getCards(){
		const cartas = document.querySelector('#allPage');
		const form = document.querySelector('#obtain');
		let fragment = document.createDocumentFragment();
		cartas.innerHTML = '';
		fragment.appendChild(form);
		JSON.parse(localStorage.getItem('wasks')).forEach(obj => {
			console.log(obj.day);
			const item = document.createElement('div');
			item.className = 'card';
			item.innerHTML = 
			`<h3 class="title-todo">${obj.title}</h3>
			<p class="day-todo">${obj.day}</p>
			<input type="button" class="delete-work" onclick="deleteCard('${obj.id}', '${obj.title}')" value="Eliminar tarea"/>`;
			item.style.backgroundColor=obj.color;
			fragment.appendChild(item);
		});
		cartas.appendChild(fragment);//
	}
	let btns = document.getElementsByClassName("btn");
	for (let i = 0; i < btns.length; i++) {
	  btns[i].addEventListener("click", function() {
		  let current = document.getElementsByClassName("active");
		  current[0].className = current[0].className.replace(" active", "");
		  this.className += " active";
	  });
	}
	function deleteCard(id, title) {
		let tasks = JSON.parse(localStorage.getItem('wasks'));
		for(let i = 0; i < tasks.length; i++) {
			if(tasks[i].id == id && tasks[i].title ===title){
				tasks.splice(i, 1);
		    }
		}
		localStorage.setItem('wasks', JSON.stringify(tasks));
		getCards();
	}
	function createCard(obj){
		if(localStorage.getItem('wasks') === null) {
			let tasks = [];
			tasks.push(obj);
			localStorage.setItem('wasks', JSON.stringify(tasks));
		} else {
			let tasks = JSON.parse(localStorage.getItem('wasks'));
			tasks.push(obj);
			localStorage.setItem('wasks', JSON.stringify(tasks));
		}
		getCards();
	}
	function showMessage(message, classname){
		const alert = document.querySelector('#alert');
		const item = document.createElement('div');
		item.className = classname;
		item.innerHTML = `${message}`;	
		if(document.querySelectorAll(`.${classname}`).length==0){
			alert.appendChild(item);
			setTimeout(() => item.remove(), 3000);
		}		
	}
	function today(){
		return JSON.stringify(new Date()).slice(1,11);
	}
	form.addEventListener('submit', (e)=>{
		e.preventDefault();
		let title = document.querySelector('.title-work').value;
		let day = document.querySelector('.calendar').value;
		let color = document.querySelector('.active').textContent
		let id = Math.floor(Math.random() * (100000 - -10)) + -10;
		console.log(id);
		//let nombre = Math.floor(Math.random() * (max - min)) + min;
		if(title && day){
			if(day>=today()){
				const work = new Works(title, day, color, id);
				createCard(work);
				form.reset();
			} else {
				showMessage("Pon la fecha bien", "advertisement");
			}
		}else{
			showMessage("Bro, tienes que completar todo", "advertisement");
		}
	});
	getCards(); 
//}