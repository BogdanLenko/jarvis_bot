import { Menu } from "@grammyjs/menu";
import type { State } from "../../../state/state";

export const agentKeyboard = async (state: State) => {
  const prisma = state.getPrisma()

  const menu = new Menu("agent-menu").dynamic(async (ctx, range) => {
    const agents = await prisma.agent.findMany()
    const preferences = await prisma.preferences.findFirst()

    if (!agents.length) {
      throw new Error("No agents found")
    }

    for (const item of agents) {
      const marker = preferences?.activeAgentId === item.id ? " ☑️" : "";
      range.text(item.name + marker, async (ctx) => {
        await prisma.preferences.update({
          where: {
            telegramId: state.getTelegramId()
          },
          data: {
            activeAgentId: item.id
          }
        })
        ctx.menu.update()
      }).row()
    }
  })

  return menu
}
