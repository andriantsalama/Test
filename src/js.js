//alert('js.js on!')
var user = {
	id:'',
	name:'',
	alias:'',
	gender:'',
	role:['Guest'],
	signup: ''
}
var users = [];
function activateTab(a){
	var tabs = document.querySelectorAll('.sin')//s_form
	var tabsF = document.querySelectorAll('.s_form')//s_form
	tabs.forEach((choice,i) => {
		choice.className='sin';
		if (i==a) {
			choice.className += ' active';
			tabsF[i].style.display = 'flex';
			/*if (choice.innerHTML!='Sign up') {tabsF[i].style.display = 'flex';}*/
		} else {
			tabsF[i].style.display = 'none';
		}
	})
}
function activateMenu(a){
	var tabs = document.querySelectorAll('.nav_menu')
	const classdiv = ['body','profile_user','identification'];
	tabs.forEach((choice,i) => {
	    choice.className='nav_menu';
	    document.querySelector('.'+classdiv[i]).style.display = 'none';
	    if (i==a) {
	        choice.className += ' active';
	        document.querySelector('.'+classdiv[i]).style.display = 'flex';
	    }
	})
}
function StateLog(){
	if (localStorage.users!=undefined) {
		users = JSON.parse(localStorage.getItem('users'))
	}
	if (sessionStorage.user==undefined) {
		document.querySelector('.identification').style.display = 'flex';
		document.querySelector('.body').style.display = 'none';
		document.querySelectorAll('.nav_menu')[1].style.display = 'none';
		activateMenu(2)
		//if (localStorage.users==undefined) {activateTab(1);} else {activateTab(0)}
	} else {
		//console.log(sessionStorage)
		var userstr = sessionStorage.getItem('user')
		user = JSON.parse(userstr)
		document.querySelector('#Greet_username').innerHTML = ' '+user.alias;
		document.querySelectorAll('.nav_menu')[1].style.display = 'block';
		document.querySelectorAll('.nav_menu')[2].innerHTML = 'Log out';
		//document.querySelectorAll('.nav_menu')[2].innerHTML='Identification';
		//activateMenu(0)
		document.querySelector('.identification').style.display='none';
		//document.querySelector('.body').style.display='flex';
		document.querySelector('.id').innerHTML = user.id;
		document.querySelector('.name').innerHTML = user.name;
		document.querySelector('.alias').innerHTML = user.alias;
	}
}
setInterval(StateLog,300);

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('.identification').style.display = 'flex';
	console.log(sessionStorage.length)

	if (sessionStorage.user==undefined) {
		document.querySelectorAll('.nav_menu')[1].style.display = 'none';
		activateMenu(2)
		if (localStorage.users==undefined) {activateTab(1);} else {activateTab(0)}
	} else {
		//console.log(sessionStorage)
		var userstr = sessionStorage.getItem('user')
		var users = JSON.parse(userstr)
		user = users[0];
		document.querySelectorAll('.nav_menu')[1].style.display = 'block';
		document.querySelectorAll('.nav_menu')[2].innerHTML = 'Log out';
		activateMenu(0)
		document.querySelector('.identification').style.display='none';
		document.querySelector('.body').style.display='flex';
		console.log(user)
	}
});
document.querySelectorAll('.Send_log')[1].addEventListener('click', (e)=>{
	var nowtime = new Date();
	var IM_Invalide = false;
	var im = '';
	var users0 = [];//users;
	const hold_User = {
		id:document.querySelectorAll('.s_form')[1].querySelector('input[name="ID"]').value,
		name:document.querySelectorAll('.s_form')[1].querySelector('input[name="NAME"]').value,
		alias:document.querySelectorAll('.s_form')[1].querySelector('input[name="ALIAS"]').value,
		gender:document.querySelectorAll('.s_form')[1].querySelector('.form-control').value,
		role: ["standard"],
		signup: nowtime
	}
	if (hold_User.id=='Admin' || (hold_User.id.length==6 || hold_User.name!='' || hold_User.alias!='' || hold_User.gender!='Gender')) {
		var locStor = JSON.stringify(hold_User);
		if (sessionStorage.user!=undefined) {sessionStorage.removeItem('user')};
		users.forEach((choice,i) => {
			if (choice.id==hold_User.id) {
				IM_Invalide=true;
				im = i
			} else {
				users0.push(choice)
			}
		})
		if (IM_Invalide) {
			alert('Matricule already saved as '+users[im].name+', Log on or contact Administrator!')
			activateTab(0)
		} else {
			users0.push(hold_User)
			if (localStorage.users!=undefined) {localStorage.removeItem('users')};
			localStorage.setItem('users', JSON.stringify(users0));
			// Stockage dans le localStorage
			sessionStorage.setItem('user', locStor);
			activateMenu(0)
			document.querySelector('.body').style.display='flex';
		}
	} else {
		alert('Fill all required area')
	}
	//console.log(sessionStorage)
});
document.querySelectorAll('.Send_log')[0].addEventListener('click', (e)=>{
	console.log(users)
	var valide_id = false;
	var rank_user = 0;
	var TLS_id = document.querySelectorAll('.s_form')[0].querySelector('input[name="ID"]').value
	users.forEach((choice,i) => {
		if (choice.id==TLS_id) {
			valide_id=true;
			rank_user=i;
		}
	})
	if (valide_id) {
		user = {
			id:users[rank_user].id,
			name:users[rank_user].name,
			alias:users[rank_user].alias,
			gender:users[rank_user].gender,
			role:users[rank_user].role,
			signup: users[rank_user].signup
		}
		if (sessionStorage.user!=undefined) {sessionStorage.removeItem('user')};
		sessionStorage.setItem('user', JSON.stringify(user));
		activateMenu(0)
		document.querySelector('.body').style.display='flex';
	} else {
		alert('The matricule "'+TLS_id+'" in not saved yet, Thank to log it if correct!')
		activateTab(1)
		document.querySelectorAll('.s_form')[1].querySelector('input[name="ID"]').value = TLS_id;
	}
});
document.querySelectorAll('.nav_menu')[2].addEventListener('click', (e)=>{
	if (user.id){
		sessionStorage.removeItem('user')
		document.querySelector('.form-control').value = 'Gender';
		document.querySelectorAll('input[type="text"]').forEach((choice) => {choice.value='';})
		document.querySelectorAll('.nav_menu')[2].innerHTML='Identification';
		user = {
			id:'',
			name:'',
			alias:'',
			gender:'',
			role:['Guest'],
			signup: ''
		}
	}
})/*
document.querySelectorAll('.nav_menu')[1].addEventListener('click', (e)=>{
	document.querySelector('.body').style.display='none';
	document.querySelector('.profile_user').style.display='flex';
})*/