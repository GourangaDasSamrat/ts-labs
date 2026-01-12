type TaskList = string[];

interface StorageManager {
  save(key: string, data: TaskList): void;
  load(key: string): TaskList;
}

const storageManager: StorageManager = {
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  load(key) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  },
};

class DOMCache {
  private map = new Map<string, HTMLElement>();

  get<T extends HTMLElement>(selector: string): T {
    if (!this.map.has(selector)) {
      const el = document.querySelector<T>(selector);
      if (!el) throw new Error(selector);
      this.map.set(selector, el);
    }
    return this.map.get(selector)! as T;
  }
}

const dom = new DOMCache();

class TaskRenderer {
  private esc(v: string): string {
    const d = document.createElement("div");
    d.textContent = v;
    return d.innerHTML;
  }

  incomplete(title: string, done: (t: string) => void): DocumentFragment {
    const f = document.createDocumentFragment();
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox"><label>${this.esc(title)}</label>`;
    li.querySelector("input")!.addEventListener("change", () => done(title));
    f.appendChild(li);
    return f;
  }

  complete(title: string, del: (t: string) => void): DocumentFragment {
    const f = document.createDocumentFragment();
    const li = document.createElement("li");
    li.innerHTML = `<span>${this.esc(
      title
    )}</span><button type="button">Delete</button>`;
    li.querySelector("button")!.addEventListener("click", () => del(title));
    f.appendChild(li);
    return f;
  }
}

class TaskManager {
  private inc = storageManager.load("incompleteTasks");
  private comp = storageManager.load("completeTasks");
  private r = new TaskRenderer();

  add(t: string) {
    if (!t.trim()) return;
    this.inc.push(t.trim());
    storageManager.save("incompleteTasks", this.inc);
    this.render();
  }

  complete(t: string) {
    this.inc = this.inc.filter((x) => x !== t);
    this.comp.push(t);
    storageManager.save("incompleteTasks", this.inc);
    storageManager.save("completeTasks", this.comp);
    this.render();
  }

  delete(t: string) {
    this.comp = this.comp.filter((x) => x !== t);
    storageManager.save("completeTasks", this.comp);
    this.render();
  }

  render() {
    const i = dom.get<HTMLUListElement>("#items");
    const c = dom.get<HTMLUListElement>(".complete-list ul");
    i.innerHTML = "";
    c.innerHTML = "";

    const ifrag = document.createDocumentFragment();
    const cfrag = document.createDocumentFragment();

    this.inc.forEach((t) =>
      ifrag.appendChild(this.r.incomplete(t, (x) => this.complete(x)))
    );
    this.comp.forEach((t) =>
      cfrag.appendChild(this.r.complete(t, (x) => this.delete(x)))
    );

    i.appendChild(ifrag);
    c.appendChild(cfrag);
  }
}

const manager = new TaskManager();

const form = document.querySelector<HTMLFormElement>(".new-task-container")!;
const input = document.getElementById("new-task") as HTMLInputElement;
const submit = document.getElementById("addTask") as HTMLInputElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  manager.add(input.value);
  form.reset();
});

manager.render();
