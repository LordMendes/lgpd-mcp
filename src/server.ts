import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpServer as McpServerClass } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerPrompts } from "./prompts/index.js";
import { registerResources } from "./resources/index.js";
import { registerTools } from "./tools/index.js";

export function createServer(): McpServer {
  const server = new McpServerClass(
    {
      name: "lgpd-mcp",
      version: "0.1.0",
    },
    {
      capabilities: {
        tools: {},
        resources: {
          subscribe: true,
        },
        prompts: {},
        logging: {},
      },
    }
  );

  registerResources(server);
  registerTools(server);
  registerPrompts(server);
  return server;
}
