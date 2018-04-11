static int expression(String str) {

		Map<Character, Character> expr = new HashMap<Character, Character>();
		expr.put('+', '+');
		expr.put('-', '-');		

		char[] arr = str.toCharArray();
		Stack<Integer> stack = new Stack<>();
		char op = ' ';
		for (int i = 0; i < arr.length; i++) {
			if (expr.containsKey(arr[i])) {
				op = arr[i];
			} else {
				int temp = arr[i] - '0';
				if (stack.isEmpty()) {
					stack.push(temp);
				}
				else {
				int num = stack.pop();
				if (op == '+')
					stack.push(num + temp);
				if (op == '-')
					stack.push(num - temp);
				}

			}

		}
		return stack.pop();

	}
