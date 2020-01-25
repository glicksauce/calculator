$(()=>{

    var output = ' ';
    var display = ''
    var memOutput = '(';
    var memArray = [''];
    var tempArray = [''];
    var testPar;
    var outputTrim;
    ceCount = 0;

    //functions:
    //when a number is clicked:
    const numbClick = (number)  => {

        if (isNaN(output) && output != '.') {
            output = '';
          }
          if (memOutput[memOutput.length - 1] == ')') {
            memOutput = '(';
            memArray = [];
          }
        
          output += number;
          $("#screen").html(output);
          if (output.length > 14) {
            $("#screen").html("<font color='red'>ERR LENGTH!</font>");
          }

    }
    

    //subtract function:
    const subtract = () =>{
      //output = eval(output)
      memArray.push(output);
      memArray.push('-')
      memOutput += output + " - ";
      output = '-';
    
      //if ')' detected then add '('
      testPar = memOutput.length - 4;
      if (memOutput[testPar] == ')') {
        memOutput += '(';
      }
    
      $("#screen").html(output);
      $("#memoryScreen").html("<span>" + memOutput + "</span");
    }

    $(".button").on("click", function() {
      ceCount -= 1;
      if (ceCount < 0) {
        ceCount = 0;
      }
    });
    
    //equals button function
    const equals = () =>{

        if (memOutput[memOutput.length - 1] == ')') {
          memArray = memArray.concat(tempArray);
        } else {
          memArray.push(output);
          memOutput += output + ')';
          tempArray = memArray.slice(2);
        }
      
        output = memArray.join('');
        output = eval(output);
        output = +output.toFixed(7); //limits digits
        display = output;
        memArray = [output];


        $("#screen").html(display);
      
        if (memOutput.length > 30) {
          outputTrim = (memOutput.length - 30);
          memOutput = memOutput.substring(outputTrim);
        }
        $("#memoryScreen").html("<span>" + memOutput + "</span");
        output = ' ';
        
      }    

    //number button mouse click
    $(".number").on("click", function(){
        numbClick(event.currentTarget.id)
    }) 

    //keyboard button press functions
    $(document).on("keypress",function(){
        //if they key is between 0 and 9:
        if (event.which >= 48 && event.which <=57){
          //passes number to numClick function
          numbClick(String.fromCharCode(event.which))

        //if minus key is pressed
        } else if (event.which == 45) {
            subtract()
        //if plus key is pressed
        } else if (event.which == 43) {
        //if return key is pressed
        } else if (event.which == 13) {
            equals()
        } else{
            console.log(event.which)
        }
    })
    
    //AC button
    $("#AC").on("click", function() {
      $("#screen").html("00");
      $("#memoryScreen").html("<span>0</span>");
      output = ' ';
      memOutput = '(';
      memArray = [''];
      display = '';
    });
    
    //CE button
    $("#CE").on("click", function() {

      //if CE button is clicked twice in a row it triggers AC click
      ceCount += 2;
      if (ceCount > 2) {
        $("#AC").click();
        ceCount = 0;
      }

      //resets screen to 0
      $("#screen").html("0");
      output = ' ';
    });
    
    //plusMinus button
    $("#plusMinus").on("click", function() {
    
      if (display == '' && memArray[0] != '') {
        display = memArray[0];
      } else if (output != '') {
        display = output;
      } else if (display == '') {
        display = 1;
        //memOutput += '(';
        memOutput += display;
        memArray.push(display);
      }
    
      display = display * -1;
    
      //if ')' detected then add '('
      testPar = memOutput.length - 4;
      if (memOutput[testPar] == ')') {
        memOutput += '(';
      }
    
      memOutput += ' * -1 ';
      memArray.push('*');
      memArray.push('-1');
      $("#screen").html(display);
      //output = display;
      $("#memoryScreen").html("<span>" + memOutput + "</span");
    });
    
    //multiply
    $("#mult").on("click", function() {
      memArray.push(output);
      memArray.push('*')
      memOutput += output + " * ";
      output = 'x';
    
      //if ')' detected then add '('
      testPar = memOutput.length - 4;
      if (memOutput[testPar] == ')') {
        memOutput += '(';
      }
    
      $("#screen").html(output);
      $("#memoryScreen").html("<span>" + memOutput + "</span");
    });
    
    //divide
    $("#divide").on("click", function() {
      memArray.push(output);
      memArray.push('/')
      memOutput += output + " ÷ ";
      output = '÷';
    
      //if ')' detected then add '('
      testPar = memOutput.length - 4;
      if (memOutput[testPar] == ')') {
        memOutput += '(';
      }
    
      $("#screen").html(output);
      $("#memoryScreen").html("<span>" + memOutput + "</span");
    });

    
    //subtract button mouse click
    $("#subtract").on("click",subtract)
    
    //add
    $("#add").on("click", function() {
      memArray.push(output);
      memArray.push('+')
      memOutput += output + " + ";
      output = '+';
    
      //if ')' detected then add '('
      testPar = memOutput.length - 4;
      if (memOutput[testPar] == ')') {
        memOutput += '(';
      }
    
      $("#screen").html(output);
      $("#memoryScreen").html("<span>" + memOutput + "</span");
    });
    

    //equals button
    //if no operator then clear
    $("#eq").on("click", equals)

})