import type { Context } from "grammy";
import type { Part } from "../../types/parts.type";
import { sendMessage } from "./sendMessage";
import { getText } from "./extractTextFromResponse";
import { sendTgMessage } from "../telegram/sendTgMessage";
import type { State } from "../../../state/state";
import { withTimeout } from "../system/withTimeout";



export const routeMessage = async (state: State, ctx: Context, parts: Part[]) => {
  const response = await withTimeout(sendMessage(state, parts), 600000);
  if (response.timedOut) {
    return
  } else {
    const text = getText(response);
    await sendTgMessage(ctx, text);
  }
}
