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
  def create(title: String, description: Option[String] = None): Todo = {
    Todo(
      title = title,
      description = description
    )
  }
}