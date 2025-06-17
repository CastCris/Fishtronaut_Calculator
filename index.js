const translate={
	"/":0,
	"*":1,
	"-":2,
	"+":3,
}
function sleep(milis){
	//console.log(milis);
	return new Promise(resolve=>setTimeout(resolve,milis));
}

function validate_input(user_input){
	var keys_translate=Object.keys(translate);
	var state=0; // 0 for number and 1 for operations
	for(var i=0;i<user_input.length;++i){
		if(user_input[i].charCodeAt(0)==32)
			continue;
		var ascii_value=user_input[i].charCodeAt(0);
		if(keys_translate.includes(user_input[i])){
			state=0;
			continue;
		}
		if(ascii_value<48||ascii_value>57){
			return 0;
		}
		state=1;
	}
	return state;
}
function get_operations(user_input){
	var keys_translate=Object.keys(translate);
	var operations=[];
	var index_operations=0;
	for(var i=0;i<user_input.length;++i){
		if(!keys_translate.includes(user_input[i]))
			continue;
		operations.push(user_input[i]);
		++index_operations;
	}
	return operations;
}
function get_numbers(user_input){
	var keys_translate=Object.keys(translate);
	var numbers=[""];
	var index_numbers=0;
	for(var i=0;i<user_input.length;++i){
		if(keys_translate.includes(user_input[i])){
			numbers[index_numbers]=Number(numbers[index_numbers]);
			++index_numbers;
			numbers.push("");
			continue;
		}
		if(user_input[i].charCodeAt(0)<48||user_input[i].charCodeAt(0)>57)
			continue;
		numbers[index_numbers]+=user_input[i];
	}
	numbers[index_numbers]=Number(numbers[index_numbers]);
	return numbers;
}


function carry_operation(x, y, opr) {
	switch (opr) {
		case "*":
			return x * y;
		case "/":
			return x / y;
		case "+":
			return x + y;
		case "-":
			return x - y;
	}
}	

function calculate(init,end,operations,numbers){
	if(init>end){
		//console.log(numbers[init]);
		return numbers[init];
	}
	if(init==end){
		//console.log(operations[init]);
		return carry_operation(numbers[init],numbers[init+1],operations[init]);
	}

	var middle=init;
	for(var i=init;i<=end;++i){
		if(translate[operations[middle]]<=translate[operations[i]])
			middle=i;
	}
	var opr=operations[middle];

	var res1=calculate(init,middle-1,operations,numbers);
	var res2=calculate(middle+1,end,operations,numbers);

	//console.log(res1+" "+res2);
	//console.log(opr);

	return carry_operation(res1,res2,opr);
}

async function fish(){
	var input=document.getElementById("user_input");
	var output=document.getElementById("output");
	var output_value=get_numbers(output.textContent);

	output.classList.remove("animation_rotate");
	if(!validate_input(input.value)){
		output.style.color="red"
		output.textContent="Please, insert a valid operation...";
		return;
	}
	output.textContent="processing the calcule..";
	output.classList.add("animation_rotate");
	output.style.color="blue";

	var operations=get_operations(input.value);
	var numbers=get_numbers(input.value);

	var result=calculate(0,operations.length-1,operations,numbers);
	if(result==output_value[0]){
		output.classList.remove("animation_rotate");
		output.style.color="brown";
		output.textContent="The result expression its: "+result;
		return;
	}

	await sleep(Math.floor(2000+Math.random()*5000));

	output.classList.remove("animation_rotate");
	output.style.color="brown";
	output.textContent="The result expression its: "+result;
}
