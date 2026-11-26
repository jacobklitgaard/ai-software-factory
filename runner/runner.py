import threading
import time

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()
results = {}  # issue-nummer -> resultat
lock = threading.Lock()


class Task(BaseModel):
    issue: int


def run_task(issue: int):
    time.sleep(10)  # den falske agent "arbejder"
    results[issue] = {"status": "DONE", "summary": "Fake agent finished"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/task")
def start_task(task: Task):
    with lock:
        if any(r["status"] == "running" for r in results.values()):
            raise HTTPException(status_code=409, detail="busy")
        results[task.issue] = {"status": "running"}
    threading.Thread(target=run_task, args=(task.issue,), daemon=True).start()
    return {"started": True}


@app.get("/results")
def get_results():
    return results