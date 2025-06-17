package models

import java.time.LocalDateTime
import java.util.UUID

case class Todo(
  id: String = UUID.randomUUID().toString,
  title: String,
  description: Option[String] = None,
  completed: Boolean = false,
  createdAt: LocalDateTime = LocalDateTime.now(),
  updatedAt: LocalDateTime = LocalDateTime.now()
)

object Todo {
  // サンプルデータ（後でデータベースに置き換え可能）
  private var todos: List[Todo] = List(
    Todo(title = "Play Frameworkを学ぶ", description = Some("Scalaを使ったWeb開発")),
    Todo(title = "TODOアプリを作成", description = Some("基本的なCRUD操作を実装")),
    Todo(title = "テストを書く", description = Some("単体テストと統合テスト"))
  )

  def getAll: List[Todo] = todos

  def getById(id: String): Option[Todo] = todos.find(_.id == id)

  def create(title: String, description: Option[String] = None): Todo = {
    val newTodo = Todo(title = title, description = description)
    todos = newTodo :: todos
    newTodo
  }

  def update(id: String, title: String, description: Option[String], completed: Boolean): Option[Todo] = {
    todos.find(_.id == id) match {
      case Some(todo) =>
        val updatedTodo = todo.copy(
          title = title,
          description = description,
          completed = completed,
          updatedAt = LocalDateTime.now()
        )
        todos = todos.map(t => if (t.id == id) updatedTodo else t)
        Some(updatedTodo)
      case None => None
    }
  }

  def delete(id: String): Boolean = {
    val originalSize = todos.size
    todos = todos.filterNot(_.id == id)
    todos.size < originalSize
  }

  def toggleComplete(id: String): Option[Todo] = {
    todos.find(_.id == id) match {
      case Some(todo) =>
        val updatedTodo = todo.copy(
          completed = !todo.completed,
          updatedAt = LocalDateTime.now()
        )
        todos = todos.map(t => if (t.id == id) updatedTodo else t)
        Some(updatedTodo)
      case None => None
    }
  }
}
