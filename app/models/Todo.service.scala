package services

import models.{Todo, TodoRepository}
import databases.todo.TodoStats
import scala.concurrent.{Future, ExecutionContext}
import javax.inject.{Inject, Singleton}
import java.time.LocalDateTime

/** Todo サービス層 ビジネスロジックを担当する
  */
@Singleton
class TodoService @Inject() (
    todoRepository: TodoRepository
)(implicit ec: ExecutionContext) {

  /** 全てのTodoを取得
    */
  def getAllTodos(): Future[List[Todo]] = {
    todoRepository.findAll()
  }

  /** IDでTodoを取得
    */
  def getTodoById(id: String): Future[Option[Todo]] = {
    todoRepository.findById(id)
  }

  /** 完了状態でTodoをフィルタ
    */
  def getTodosByStatus(completed: Boolean): Future[List[Todo]] = {
    todoRepository.findByCompleted(completed)
  }

  /** タイトルでTodoを検索（部分一致）
    */
  def searchTodosByTitle(query: String): Future[List[Todo]] = {
    if (query.trim.isEmpty) {
      getAllTodos()
    } else {
      todoRepository.findByTitle(query)
    }
  }

  /** 新しいTodoを作成 ビジネスルール: タイトルは必須で空文字不可
    */
  def createTodo(
      title: String,
      description: Option[String] = None
  ): Future[Either[String, Todo]] = {
    if (title.trim.isEmpty) {
      Future.successful(Left("タイトルは必須です"))
    } else {
      val todo = Todo(
        title = title.trim,
        description = description.filter(_.trim.nonEmpty),
        completed = false
      )
      todoRepository.create(todo).map(Right(_))
    }
  }

  /** Todoを更新
    */
  def updateTodo(
      id: String,
      title: String,
      description: Option[String],
      completed: Boolean
  ): Future[Either[String, Todo]] = {
    if (title.trim.isEmpty) {
      Future.successful(Left("タイトルは必須です"))
    } else {
      todoRepository.findById(id).flatMap {
        case Some(existingTodo) =>
          val updatedTodo = existingTodo.copy(
            title = title.trim,
            description = description.filter(_.trim.nonEmpty),
            completed = completed,
            updatedAt = LocalDateTime.now()
          )
          todoRepository.update(id, updatedTodo).map {
            case Some(todo) => Right(todo)
            case None       => Left("更新に失敗しました")
          }
        case None =>
          Future.successful(Left("指定されたTodoが見つかりません"))
      }
    }
  }

  /** Todoの完了状態をトグル
    */
  def toggleTodoCompletion(id: String): Future[Either[String, Todo]] = {
    todoRepository.toggleCompleted(id).map {
      case Some(todo) => Right(todo)
      case None       => Left("指定されたTodoが見つかりません")
    }
  }

  /** Todoを削除
    */
  def deleteTodo(id: String): Future[Either[String, String]] = {
    todoRepository.delete(id).map { deleted =>
      if (deleted) {
        Right(s"Todo($id)を削除しました")
      } else {
        Left("指定されたTodoが見つかりません")
      }
    }
  }

  /** 完了済みのTodoを一括削除
    */
  def deleteCompletedTodos(): Future[String] = {
    todoRepository.deleteCompleted().map { count =>
      s"完了済みのTodo ${count}件を削除しました"
    }
  }

  /** 全てのTodoを削除
    */
  def deleteAllTodos(): Future[String] = {
    todoRepository.deleteAll().map { count =>
      s"全てのTodo ${count}件を削除しました"
    }
  }

  /** Todo統計情報を取得
    */
  def getTodoStats(): Future[TodoStats] = {
    todoRepository.getStats()
  }

  /** 完了率を計算
    */
  def getCompletionRate(): Future[Double] = {
    getTodoStats().map { stats =>
      if (stats.total == 0) 0.0
      else (stats.completed.toDouble / stats.total.toDouble) * 100.0
    }
  }

  /** 期限切れのTodoを取得（拡張用） 現在は実装なしだが、将来的にdueDate機能を追加する際に使用
    */
  def getOverdueTodos(): Future[List[Todo]] = {
    // 現在は空のリストを返すが、将来的にdueDate機能を追加時に実装
    Future.successful(List.empty[Todo])
  }
}
