package models

type Task struct {
	ID          int
	Description string
	DueDate     string
	IsImportant bool
	IsCompleted bool
	IsToday     bool
}

var tasks []*Task

func createTask(tInfo map[string]interface{}) *Task {
	task := Task{}
	task.ID = tInfo["ID"].(int)
	task.Description = tInfo["Description"].(string)
	task.DueDate = tInfo["DueDate"].(string)
	task.IsImportant = tInfo["IsImportant"].(bool)
	task.IsCompleted = tInfo["IsCompleted"].(bool)
	task.IsToday = tInfo["IsToday"].(bool)
	return &task
}

func getTask(taskId int) *Task {
	for _, task := range tasks {
		if task.ID == taskId {
			return task
		}
	}
	return &Task{}
}

func addTask(task *Task) {
	tasks = append(tasks, task)
}

func updateTask(taskId int, newInfo map[string]interface{}) {
	for _, task := range tasks {
		if task.ID == taskId {
			task.ID = newInfo["ID"].(int)
			task.Description = newInfo["Description"].(string)
			task.DueDate = newInfo["DueDate"].(string)
			task.IsImportant = newInfo["IsImportant"].(bool)
			task.IsCompleted = newInfo["IsCompleted"].(bool)
			task.IsToday = newInfo["IsToday"].(bool)
		}
	}
}

func deleteTask(taskId int) {
	for i, task := range tasks {
		if task.ID == taskId {
			tasks[i] = tasks[len(tasks)-1]
			tasks = tasks[:len(tasks)-1]
		}
	}
}
