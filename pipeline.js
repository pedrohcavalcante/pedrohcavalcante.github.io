// Instruction object
function Instruction(string0, string1, string2, string3) {

    // CONSTRUCTOR
        this.string0 = string0;

        // Standart instructions
        if (string0 == "add" ||
            string0 == "sub" ||
            string0 == "and" ||
            string0 == "or" || 
            string0 == "slt" ) {
            this.dest = string1;
            this.op1 = string2;
            this.op2 = string3;
            }
        // Standart instructions without op2
        else if (string0 == "addi" ||
                 string0 == "ori" ||
                 string0 == "sll" ||
                 string0 == "slr") {
            this.dest = string1;
            this.op1 = string2;
            this.op2 = string3;
            }
        // Syscall
        else if (string0 == "syscall") {
            this.dest = "$v0";
            this.op1 = "$v0";
            this.op2 = null;
        }
        // Instruction "j" (jump)
        else if (string0 == "j") {
            this.dest = string1;
            this.op1 = null;
            this.op2 = null;
        }
        // Instruction "mfhi"
        else if (string0 == "mfhi") {
            this.dest = string1;
            this.op1 = "HI";
            this.op2 = null;
        }
        // Instruction "mflo"
        else if (string0 == "mflo") {
            this.dest = string1;
            this.op1 = "LO";
            this.op2 = null;
        }
        // Instruction "mult"
        else if (string0 == "mult") {
            this.dest = "HI";
            this.op1 = string1;
            this.op2 = string2;
        }
        // Instruction "div"
        else if (string0 == "div") {
            this.dest = "LO";
            this.op1 = string1;
            this.op2 = string2;
        }
        // Instruction "lw"
        else if (string0 == "lw") {
            this.dest = string1;
            this.op1 = string2;
            this.op2 = null;
        }
        // Instruction "sw"
        else if (string0 == "sw") {
            this.dest = string2;
            this.op1 = string1;
            this.op2 = null;
        }
        // Instructions "beq" and "bne"
        else if (string0 == "beq" ||
                string0 == "bne") {
            this.dest = string3;
            this.op1 = string1;
            this.op2 = string2;
        }
        // Unknown instruction
        else {
            this.dest = null;
            this.op1 = null;
            this.op2 = null;
        }
    
    // METHODS
        this.printInstructionLine = function() {

            // Prints internal details of Instruction object
            // document.getElementById("output").innerHTML +=
            // "this.string0 = " + this.string0 + "<br>" +
            // "this.dest = " + this.dest + "<br>" +
            // "this.op1 = " + this.op1 + "<br>" +
            // "this.op2 = " + this.op2 + "<br>";

            // Standart instructions
            if (string0 == "add" ||
                string0 == "sub" ||
                string0 == "and" ||
                string0 == "or" || 
                string0 == "slt" ) {
                return this.string0 + " " + this.dest + " " + 
                    this.op1 + " " + this.op2;
                }
            // Standart instructions without op2
            else if (string0 == "addi" ||
                    string0 == "ori" ||
                    string0 == "sll" ||
                    string0 == "slr") {
                return this.string0 + " " + this.dest + " " + 
                    this.op1 + " " + this.op2;
                }
            // Syscall
            else if (string0 == "syscall") {
                return this.string0;
            }
            // Instruction "j" (jump)
            else if (string0 == "j") {
                return this.string0 + " " + this.dest;
            }
            // Instruction "mfhi"
            else if (string0 == "mfhi") {
                return this.string0 + " " + this.dest;
            }
            // Instruction "mflo"
            else if (string0 == "mflo") {
                return this.string0 + " " + this.dest;
            }
            // Instructions "mult" and "div"
            else if (string0 == "mult" ||
                    string0 == "div") {
                return this.string0 + " " + this.op1 + " " + this.op2;
            }
            // Instruction "lw"
            else if (string0 == "lw") {
                return this.string0 + " " + this.dest + " " + this.op1;
            }
            // Instruction "sw"
            else if (string0 == "sw") {
                return this.string0 + " " + this.op1 + " " + this.dest;
            }
            // Instructions "beq" and "bne"
            else if (string0 == "beq" ||
                    string0 == "bne") {
                return this.string0 + " " + this.op1 + " " +
                    this.op2 + " " + this.dest;
            }
            // Unknown instruction
            else {
                if (this.string0 == null) {
                    return "0";
                }
                else {
                    return this.string0;
                }
            }
        }

        this.isRegularInstruction = function() {
            if (this.string0 == "add" || 
                this.string0 == "sub" || 
                this.string0 == "and" || 
                this.string0 == "or" || 
                this.string0 == "slt" || 
                this.string0 == "addi" || 
                this.string0 == "ori" || 
                this.string0 == "sll" || 
                this.string0 == "slr" || 
                this.string0 == "syscall" || 
                this.string0 == "j" || 
                this.string0 == "mfhi" || 
                this.string0 == "mflo" || 
                this.string0 == "mult" || 
                this.string0 == "div" || 
                this.string0 == "lw" || 
                this.string0 == "sw" || 
                this.string0 == "beq" || 
                this.string0 == "bne") {
                return true;
            }
            else {
                return false;
            }
        }

        this.isJumpInstruction = function() {
            if (this.string0 == "j" || 
                this.string0 == "beq" || 
                this.string0 == "bne") {
                return true;
            }
            else {
                return false;
            }
        }
}

// Pipeline object
function Pipeline(instructions) {
    // CONSTRUCTOR
        this.waitingList = instructions;
        this.index = 0;
        this.if = new Instruction(null, null, null, null);
        this.id = new Instruction(null, null, null, null);
        this.ex = new Instruction(null, null, null, null);
        this.mem = new Instruction(null, null, null, null);
        this.wb = new Instruction(null, null, null, null);
    
    // METHODS
        this.checkConflict = function(instruction1, instruction2) {
            // Instructions1 that never generate conflict
            if (instruction1.string0 == null || 
                instruction1.string0 == "j" || 
                instruction1.string0 == "beq" || 
                instruction1.string0 == "bne") {
                return false;
            }
            // Instructions1 that have dest to be compared
            else if (instruction1.string0 == "syscall" || 
                    instruction1.string0 == "mfhi" || 
                    instruction1.string0 == "mflo" || 
                    instruction1.string0 == "mult" || 
                    instruction1.string0 == "div" || 
                    instruction1.string0 == "lw" || 
                    instruction1.string0 == "add" || 
                    instruction1.string0 == "sub" || 
                    instruction1.string0 == "and" || 
                    instruction1.string0 == "or" || 
                    instruction1.string0 == "slt" || 
                    instruction1.string0 == "addi" || 
                    instruction1.string0 == "ori" || 
                    instruction1.string0 == "sll" || 
                    instruction1.string0 == "slr") {
                // Instructions2 that have only op1 to be compared
                if (instruction2.string0 == "syscall" || 
                    instruction2.string0 == "mfhi" || 
                    instruction2.string0 == "mflo" || 
                    instruction2.string0 == "sw" || 
                    instruction2.string0 == "addi" || 
                    instruction2.string0 == "ori" || 
                    instruction2.string0 == "sll" || 
                    instruction2.string0 == "slr") {
                    if (instruction2.op1 == instruction1.dest) {
                        return true;
                    }
                }
                // Comparison for lw, that has only op1, but nor properly formated
                else if (instruction2.string0 == "lw") {
                    if (instruction2.op1.slice(instruction2.op1.indexOf("(") + 1, instruction2.op1.indexOf(")")) == instruction1.dest) {
                        return true;
                    }
                }

                // Instructions2 that have both op1 and op2 to be compared
                else if (instruction2.string0 == "mult" ||
                        instruction2.string0 == "div" ||
                        instruction2.string0 == "add" ||
                        instruction2.string0 == "sub" ||
                        instruction2.string0 == "and" ||
                        instruction2.string0 == "or" ||
                        instruction2.string0 == "slt") {
                    if (instruction2.op1 == instruction1.dest || 
                        instruction2.op2 == instruction1.dest) {
                        return true;
                    }
                }
            }
            // Comparisons for sw, that has dest to be compared, but not properly formated
            else if (instruction1.string0 == "sw") {
                // Instructions2 that have only op1 to be compared
                if (instruction2.string0 == "syscall" || 
                    instruction2.string0 == "mfhi" || 
                    instruction2.string0 == "mflo" || 
                    instruction2.string0 == "sw" || 
                    instruction2.string0 == "addi" || 
                    instruction2.string0 == "ori" || 
                    instruction2.string0 == "sll" || 
                    instruction2.string0 == "slr") {
                    if (instruction2.op1 == instruction1.dest.slice(instruction1.dest.indexOf("(") + 1, instruction1.dest.indexOf(")"))) {
                        return true;
                    }
                }
                // Comparison for lw, that has only op1, but nor properly formated
                else if (instruction2.string0 == "lw") {
                    if (instruction2.op1.slice(instruction2.op1.indexOf("(") + 1, instruction2.op1.indexOf(")")) == instruction1.dest.slice(instruction1.dest.indexOf("(") + 1, instruction1.dest.indexOf(")"))) {
                        return true;
                    }
                }

                // Instructions2 that have both op1 and op2 to be compared
                else if (instruction2.string0 == "mult" ||
                        instruction2.string0 == "div" ||
                        instruction2.string0 == "add" ||
                        instruction2.string0 == "sub" ||
                        instruction2.string0 == "and" ||
                        instruction2.string0 == "or" ||
                        instruction2.string0 == "slt") {
                    if (instruction2.op1 == instruction1.dest.slice(instruction1.dest.indexOf("(") + 1, instruction1.dest.indexOf(")")) || 
                        instruction2.op2 == instruction1.dest.slice(instruction1.dest.indexOf("(") + 1, instruction1.dest.indexOf(")"))) {
                        return true;
                    }
                }
            }
        }

        this.checkJump = function() {
            if (this.if.isJumpInstruction()) {
                // Iterates through waitingList looking for the jump label
                for (i = 0; i < this.waitingList.length; i++) {
                    if (this.waitingList[i].string0.replace(":", "") == this.if.dest) {
                        // Empties pipeline
                        this.id = new Instruction(null, null, null, null);
                        this.ex = new Instruction(null, null, null, null);
                        this.mem = new Instruction(null, null, null, null);
                        this.wb = new Instruction(null, null, null, null);

                        // Sets index to continue accessing instructions after jump label
                        this.index = i + 1;
                        
                        break;
                    }
                }
            }
        }

        this.movePipeline = function() {
            // If next instruction is a regular instruction
            if (this.waitingList[this.index].isRegularInstruction()) {
                this.wb = this.mem;
                this.mem = this.ex;
                this.ex = this.id;
                this.id = this.if;

                isThereConflict = false;

                if (this.checkConflict(this.mem, this.waitingList[this.index])) {
                    isThereConflict = true;
                    this.if = new Instruction(null, null, null, null);
                }

                if (this.checkConflict(this.ex, this.waitingList[this.index]) && 
                    isThereConflict == false) {
                    isThereConflict = true;
                    this.if = new Instruction(null, null, null, null);
                }

                if (this.checkConflict(this.id, this.waitingList[this.index]) && 
                    isThereConflict == false) {
                    isThereConflict = true;
                    this.if = new Instruction(null, null, null, null);
                }

                if (this.if.string0 == null &&
                    this.id.string0 == null &&
                    this.ex.string0 == null &&
                    this.mem.string0 == null || 
                    isThereConflict == false) {
                    this.if = this.waitingList[this.index];
                    this.index++;
                }

                return true;
            }
            // If next instructions is a jump label
            else {
                // skips instruction
                this.index++;
                return false;
            }
        }

        this.movePipelineNeumann = function() {
            // If next instruction is a regular instruction
            if (this.waitingList[this.index].isRegularInstruction()) {

                this.wb = this.mem;
                this.mem = this.ex;
                this.ex = this.id;
                this.id = this.if;

                // If there is an instruction in stage MEM, the new instruction can't be fetched.
                if (this.mem.string0 != null) {
                    this.if = new Instruction(null, null, null, null);
                    return true;
                }

                isThereConflict = false;

                if (this.checkConflict(this.mem, this.waitingList[this.index])) {
                    isThereConflict = true;
                    this.if = new Instruction(null, null, null, null);
                }

                if (this.checkConflict(this.ex, this.waitingList[this.index]) && 
                    isThereConflict == false) {
                    isThereConflict = true;
                    this.if = new Instruction(null, null, null, null);
                }

                if (this.checkConflict(this.id, this.waitingList[this.index]) && 
                    isThereConflict == false) {
                    isThereConflict = true;
                    this.if = new Instruction(null, null, null, null);
                }

                if (this.if.string0 == null &&
                    this.id.string0 == null &&
                    this.ex.string0 == null &&
                    this.mem.string0 == null || 
                    isThereConflict == false) {
                    this.if = this.waitingList[this.index];
                    this.index++;
                }

                return true;
            }
            // If next instructions is a jump label
            else {
                // skips instruction
                this.index++;
                return false;
            }
        }

        this.endPipeline = function() {
            this.wb = this.mem;
            this.mem = this.ex;
            this.ex = this.id;
            this.id = this.if;
            this.if = new Instruction(null, null, null, null);
        }

        this.printPipeline = function() {
            document.getElementById("output").innerHTML += 
            "IF:  " + this.if.printInstructionLine() + "\n";

            document.getElementById("output").innerHTML += 
            "ID:  " + this.id.printInstructionLine() + "\n";

            document.getElementById("output").innerHTML += 
            "EX:  " + this.ex.printInstructionLine() + "\n";

            document.getElementById("output").innerHTML += 
            "MEM: " + this.mem.printInstructionLine() + "\n";

            document.getElementById("output").innerHTML += 
            "WB:  " + this.wb.printInstructionLine() + "\n";

            document.getElementById("output").innerHTML +=
            "----------------------------------\n";
        }
}

var instructionsInLines = new Array();
var piecesOfInstruction = new Array();
var instructions = new Array();

function addInstructions() {

    // Checks if input has been written.
    if (document.getElementById("input").value != "") {

        // Erases whatever is written on output.
        document.getElementById("output").innerHTML = "";

        // Splits input based on "\n"s.
        instructionsInLines = document.getElementById("input").value.split("\n");

        // Erases lines that are empty
        for (i = 0; i < instructionsInLines.length; i++) {
            if (instructionsInLines[i] == "") {
                instructionsInLines.splice(i, 1);
            }
        }

        // Iterates through all lines of input.
        for (i = 0; i < instructionsInLines.length; i++) {

            // Removes instruction line's commas.
            instructionsInLines[i] = instructionsInLines[i].replace(/,/g, "");

            // Splits instructions line based on spaces.
            piecesOfInstruction = instructionsInLines[i].split(" ");

            if (piecesOfInstruction.length == 1) {
                instructions.push(new Instruction(piecesOfInstruction[0], null, null, null));
            }
            else if (piecesOfInstruction.length == 2) {
                instructions.push(new Instruction(piecesOfInstruction[0], piecesOfInstruction[1], null, null));
            }
            else if (piecesOfInstruction.length == 3) {
                instructions.push(new Instruction(piecesOfInstruction[0], piecesOfInstruction[1], piecesOfInstruction[2], null));
            }
            else if (piecesOfInstruction.length == 4) {
                // Creates new Instruction object from instruction line.
                instructions.push(new Instruction(piecesOfInstruction[0], piecesOfInstruction[1], piecesOfInstruction[2], piecesOfInstruction[3]));
            }
            
        }
        // Print inputed instructions.
        document.getElementById("output").innerHTML += "Instruções recebidas: <br>"
        for (i = 0; i < instructions.length; i++) {
            document.getElementById("output").innerHTML +=
            "> " + instructions[i].printInstructionLine() + "\n";

            instructions[i].printInstructionLine();
        }

        if (document.getElementById("harvard").checked) {
            runPipeline(instructions);
        }
        else if (document.getElementById("neumann").checked) {
            runPipelineNeumann(instructions);
        }
        
    }
}

function runPipeline(instructions) {

    pipeline = new Pipeline(instructions);
    var counter = 1;

    // Makes whole pipeline process
    while (pipeline.index < instructions.length) {

        // Prints a line when pipeline starts
        if (counter == 1) {
            document.getElementById("output").innerHTML += "----------------------------------\n"; }
        
        // Moves pipeline and counts number of cicles passed
        if (pipeline.movePipeline()) {

            pipeline.checkJump();

            // Prints cicle number
            document.getElementById("output").innerHTML +=
            "Ciclo " + counter + "<br>";

            pipeline.printPipeline();

            counter++;
        }
    }

    // Finishes pipeline
    for (i = counter; i < counter + 4; i++) {
        document.getElementById("output").innerHTML +=
        "Ciclo " + i + "<br>";

        pipeline.endPipeline();

        pipeline.printPipeline();

        if (i == counter + 3) {
            document.getElementById("output").innerHTML +=
            "Total de ciclos: " + i + "\n";
        }
    }
}

function runPipelineNeumann(instructions) {
    
    pipeline = new Pipeline(instructions);
    var counter = 1;

    // Makes whole pipeline process
    while (pipeline.index < instructions.length) {

        // Prints a line when pipeline starts
        if (counter == 1) {
            document.getElementById("output").innerHTML += "----------------------------------\n"; }
        
        // Moves pipeline and counts number of cicles passed
        if (pipeline.movePipelineNeumann()) {

            pipeline.checkJump();

            // Prints cicle number
            document.getElementById("output").innerHTML +=
            "Ciclo " + counter + "<br>";

            pipeline.printPipeline();

            counter++;
        }
    }

    // Finishes pipeline
    for (i = counter; i < counter + 4; i++) {
        document.getElementById("output").innerHTML +=
        "Ciclo " + i + "<br>";

        pipeline.endPipeline();

        pipeline.printPipeline();

        if (i == counter + 4) {
            document.getElementById("output").innerHTML +=
            "Total de ciclos: " + i + "\n";
        }
    }
}