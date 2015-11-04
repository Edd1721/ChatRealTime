const controlRecord = document.querySelector('#btnRecord');

controlRecord.addEventListener('click',Grabar);


//Métodos
function Grabar(e)
{
	e.preventDefault();
	console.log('Grabación iniciada');
}