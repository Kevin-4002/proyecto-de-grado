export const executePythonCode = (code) => {
  try {
    const lines = code.split('\n').filter(line => line.trim());
    let output = [];
    let variables = {};
    const MAX_OPERATIONS = 1000;
    let operationsCount = 0;

    const evaluateExpression = (expression) => {
      operationsCount++;
      if (operationsCount > MAX_OPERATIONS) throw new Error("Límite de operaciones excedido");
      
      expression = expression.trim();
      if (expression.startsWith('"') && expression.endsWith('"')) return expression.slice(1, -1);
      if (expression.startsWith("'") && expression.endsWith("'")) return expression.slice(1, -1);
      if (variables.hasOwnProperty(expression)) return variables[expression];
      if (!isNaN(expression)) return parseFloat(expression);
      
      // Basic arithmetic: +, -, *, /, **, %
      // Order of operations: **, then * / %, then + -
      // This is a very simplified parser, not a full Python interpreter.
      
      // Handle exponentiation first
      if (expression.includes('**')) {
        const parts = expression.split('**');
        let result = evaluateExpression(parts[0]);
        for (let i = 1; i < parts.length; i++) {
          result = Math.pow(result, evaluateExpression(parts[i]));
        }
        return result;
      }

      // Handle multiplication, division, modulo next
      // This part would need a more robust shunting-yard or similar algorithm for correctness
      // For simplicity, we'll do a left-to-right pass for * / % then for + -
      // This is NOT how Python's precedence works, but is a simplification.
      
      let tempExpression = expression;
      
      // Simplistic evaluation for multiplication/division/modulo (left-to-right)
      // This is not a robust arithmetic parser. For example, "2*3+4" will be evaluated based on splitting.
      // A proper solution would involve tokenizing and parsing with operator precedence.
      
      // For now, let's try to handle very simple cases for *, /, %
      if (expression.includes('*')) {
        const parts = expression.split('*').map(p => evaluateExpression(p.trim()));
        return parts.reduce((acc, val) => acc * val);
      }
      if (expression.includes('/')) {
         const parts = expression.split('/').map(p => evaluateExpression(p.trim()));
         let res = parts[0];
         for(let i=1; i<parts.length; i++) res /= parts[i];
         return res;
      }
       if (expression.includes('//')) { // Integer division
        const parts = expression.split('//').map(p => evaluateExpression(p.trim()));
        let res = parts[0];
        for(let i=1; i<parts.length; i++) res = Math.floor(res / parts[i]);
        return res;
      }
      if (expression.includes('%')) {
        const parts = expression.split('%').map(p => evaluateExpression(p.trim()));
        let res = parts[0];
        for(let i=1; i<parts.length; i++) res %= parts[i];
        return res;
      }

      // Handle addition and subtraction (left-to-right)
      if (expression.includes('+')) {
        const parts = expression.split('+').map(p => evaluateExpression(p.trim()));
        return parts.reduce((acc, val) => acc + val);
      }
      if (expression.includes('-')) {
         const parts = expression.split('-').map(p => evaluateExpression(p.trim()));
         let res = parts[0];
         for(let i=1; i<parts.length; i++) res -= parts[i];
         return res;
      }
      
      throw new Error(`No se pudo evaluar la expresión: ${expression}`);
    };

    for (let line of lines) {
      operationsCount++;
      if (operationsCount > MAX_OPERATIONS) throw new Error("Límite de operaciones excedido");
      line = line.trim();
      if (line.startsWith('#')) continue; 
      
      if (line.includes(' = ') && !line.includes('==') && !line.includes('!=')) {
        const [varName, valueExpr] = line.split(' = ', 2);
        const cleanVarName = varName.trim();
        variables[cleanVarName] = evaluateExpression(valueExpr);
      } else if (line.startsWith('print(') && line.endsWith(')')) {
        const contentExpr = line.slice(6, -1);
        const evaluatedContent = evaluateExpression(contentExpr);
        output.push(typeof evaluatedContent === 'string' ? evaluatedContent : String(evaluatedContent));
      } else if (line.trim() !== "") {
         // If the line is not a comment, not an assignment, not a print, and not empty,
         // try to evaluate it as an expression (though it won't be stored or printed unless part of print/assign)
         // This is to catch potential errors in standalone expressions if the user types them.
         try {
            evaluateExpression(line);
         } catch (e) {
            // If it's just an expression that can't be evaluated alone (e.g. a variable name without assignment)
            // it might be fine if it's part of a multi-line construct not supported by this basic executor.
            // But if it's a clear syntax error for this basic executor, then throw.
            // For now, we are strict.
            throw new Error(`Sintaxis no soportada o error en la línea: ${line.substring(0, 30)}...`);
         }
      }
    }
    
    return { success: true, output: output.join('\n'), variables };
  } catch (error) {
    return { success: false, error: error.message || "Error desconocido en la ejecución" };
  }
};