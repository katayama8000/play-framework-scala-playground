package models

import java.time.LocalDateTime
import java.util.UUID
import databases.todo.TodoDatabase
import scala.concurrent.{Future, ExecutionContext}

case class Todo(
  id: String = UUID.randomUUID().toString,
  title: String,
  description: Option[String] = None,
  completed: Boolean = false,
  createdAt: LocalDateTime = LocalDateTime.now(),
  updatedAt: LocalDateTime = LocalDateTime.now()
)

object Todo {
  // データベースを利用するためにExecutionContextをインポート
  implicit val ec: ExecutionContext = ExecutionContext.global

  // 同期APIからFutureベースのAPIへの変換ヘルパーメソッド
  private def await[T](future: Future[T]): T = {
    import scala.concurrent.duration._
    scala.concurrent.Await.result(future, 5.seconds)
  }

  def getAll: List[Todo] = {
    await(TodoDatabase.findAll())
  }

  def getById(id: String): Option[Todo] = {
    await(TodoDatabase.findById(id))
  }

  def create(title: String, description: Option[String] = None): Todo = {
    val newTodo = Todo(title = title, description = description)
    await(TodoDatabase.create(newTodo))
  }

  def update(id: String, title: String, description: Option[String], completed: Boolean): Option[Todo] = {
    getById(id).flatMap { existingTodo =>
      val updatedTodo = existingTodo.copy(
        title = title,
        description = description,
        completed = completed
      )
      await(TodoDatabase.update(id, updatedTodo))
    }
  }

  def delete(id: String): Boolean = {
    await(TodoDatabase.delete(id))
  }

  def toggleComplete(id: String): Option[Todo] = {
    await(TodoDatabase.toggleCompleted(id))
  }
}
