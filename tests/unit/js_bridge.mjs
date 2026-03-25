import { add, subtract } from "../../src/calculator.js";
import { createCalculatorEngine } from "../../src/calculator-engine.js";

function runEngineSequence(actions) {
  const engine = createCalculatorEngine();

  for (const action of actions) {
    if (action.type === "digit") {
      engine.pressDigit(String(action.value));
      continue;
    }

    if (action.type === "dot") {
      engine.pressDot();
      continue;
    }

    if (action.type === "op") {
      engine.pressOp(String(action.value));
      continue;
    }

    if (action.type === "equals") {
      engine.pressEquals();
      continue;
    }

    if (action.type === "action") {
      engine.pressAction(String(action.value));
      continue;
    }
  }

  return engine.getState();
}

function handlePayload(payload) {
  if (payload.kind === "add") {
    return { value: add(payload.a, payload.b) };
  }

  if (payload.kind === "subtract") {
    return { value: subtract(payload.a, payload.b) };
  }

  if (payload.kind === "engine-sequence") {
    return runEngineSequence(payload.actions ?? []);
  }

  throw new Error(`Unsupported payload kind: ${payload.kind}`);
}

async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  const input = chunks.join("").trim();
  const payload = input ? JSON.parse(input) : {};
  const result = handlePayload(payload);
  process.stdout.write(JSON.stringify(result));
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
