export interface Writing {
  id: number;
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
}

export const writings: Writing[] = [
  {
    id: 1,
    title: "the orchestration layer is the new interface layer",
    description: "why agent orchestration needs a new design language for human supervision",
    date: "jun 6, 26",
    slug: "the-orchestration-layer-is-the-new-interface",
    content: `The tools in your stack were built for a human sitting in one system, clicking through steps. That human is being replaced by a system of agents and that shift demands a different interface.

Not for a human executing tasks, but for one directing the system doing them.

The orchestration layer decides which model handles a task, what context it gets, and when to pull a human in.

But when people hear "orchestration" today, they usually mean something narrower.

LangGraph and Conductor stitch agents together at the code level, Cursor orchestrates coding agents inside an IDE, and Linear is bolting agent actions onto tickets.

The real orchestration layer will sit above all of them, the one a person uses to direct dozens of agents to run across a company's sources of truth like Stripe, PostHog, Slack, Gmail, the CRM, and whatever else they run on.

The orchestration layer is the new interface layer that hasn't been built yet.

---

## there's no design language for supervision

It's not difficult to chain agents together, the models are public, the APIs are accessible, the frameworks are typically open sourced.

But this makes agent-to-agent workflows extremely commoditized. The part that can't be copied is the layer on top, the human-facing part that knows when to pull someone in and what to show them when it does.

Every previous interface paradigm came with a design language.

In the 80s, GUI provided windows and buttons and in the late 90s, the web gave us links and pages.

There is no equivalent primitive for supervision.

What does "needs review" look like when 200 agent decisions flow past in an hour? How do you surface the three that actually need a human?

These are design problems, not infrastructure problems.

Ramp's agents auto-approve the majority of expenses and flag the rest for human judgment. The review surface for those flags is a Slack message. That's not a design language, that's a placeholder.

The tooling for building agent workflows is miles ahead of the understanding, and agent observability is miles behind agent tooling. That gap is where the real interface work is waiting.

And it matters more than it looks, because the supervision interface isn't just where humans watch agents. It's where agents learn from humans.

---

## policy is trained into existence

Orchestration needs intelligence, but most people think static guardrails are enough to keep agents in check.

But that will never work.

You're effectively trying to optimize and restrain a black box at the same time. In theory, a guardrail can stop an agent from saying the wrong thing, but it can't teach it to understand why.

Companies will need to give their agents almost full autonomy and rely on human-in-the-loop correction to build the underlying intelligence of the orchestration layer, the policy engine.

This engine can't be designed upfront, it has to be trained into existence by the people using it. No company can enumerate every edge case in advance. The policy emerges from thousands of corrections made by people handling real exceptions.

Every time someone on your team fixes a bad routing decision or overrides an agent's call, that correction is unique training data that teaches the system something specific to your business that no model provider ships.

In practice, human corrects the system, correction becomes a rule, system handles that case on its own, human only sees harder cases. Each cycle raises the bar for what needs a human.

This will be the first interface that captures tribal knowledge as a product feature.

The days of judgment and understanding on how to handle edge cases living solely in people's heads will be a thing of the past.

---

## the paradox of good orchestration

The orchestration layer will become the most valuable layer in a company's stack, and it will be defined by its own disappearance.

As it learns from human corrections, you interact with it less and less. It handles more on its own. The only time you notice it is when something goes wrong.

We've always measured software by how much people use it. This will be the first measured by how little they need to.`,
  },
];

export function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 250));
  return `${minutes} min read`;
}
