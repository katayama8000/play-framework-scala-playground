package databases.todo

import models.Todo
import java.time.LocalDateTime
import scala.concurrent.Future
import scala.collection.mutable

/** インメモリTodoデータベース シンプルなインメモリストレージを提供
  */
object TodoDatabase {

  // インメモリストレージ（mutable.Map使用）
  private val storage: mutable.Map[String, Todo] =
    mutable.Map.empty[String, Todo]

  /** 全てのTodoを取得
    */
  def findAll(): Future[List[Todo]] = {
    Future.successful(storage.values.toList.sortBy(_.createdAt))
  }

  /** IDでTodoを検索
    */
  def findById(id: String): Future[Option[Todo]] = {
    Future.successful(storage.get(id))
  }

  /** 完了状態でTodoを検索
    */
  def findByCompleted(completed: Boolean): Future[List[Todo]] = {
    Future.successful(
      storage.values.filter(_.completed == completed).toList.sortBy(_.createdAt)
    )
  }

  /** タイトルでTodoを検索（部分一致）
    */
  def findByTitle(title: String): Future[List[Todo]] = {
    Future.successful(
      storage.values
        .filter(_.title.toLowerCase.contains(title.toLowerCase))
        .toList
        .sortBy(_.createdAt)
    )
  }

  /** 新しいTodoを作成
    */
  def create(todo: Todo): Future[Todo] = {
    val newTodo = todo.copy(
      createdAt = LocalDateTime.now(),
      updatedAt = LocalDateTime.now()
    )
    storage.put(newTodo.id, newTodo)
    Future.successful(newTodo)
  }

  /** Todoを更新
    */
  def update(id: String, todo: Todo): Future[Option[Todo]] = {
    storage.get(id) match {
      case Some(existingTodo) =>
        val updatedTodo = todo.copy(
          id = id,
          createdAt = existingTodo.createdAt,
          updatedAt = LocalDateTime.now()
        )
        storage.put(id, updatedTodo)
        Future.successful(Some(updatedTodo))
      case None =>
        Future.successful(None)
    }
  }

  /** Todoの完了状態をトグル
    */
  def toggleCompleted(id: String): Future[Option[Todo]] = {
    storage.get(id) match {
      case Some(todo) =>
        val updatedTodo = todo.copy(
          completed = !todo.completed,
          updatedAt = LocalDateTime.now()
        )
        storage.put(id, updatedTodo)
        Future.successful(Some(updatedTodo))
      case None =>
        Future.successful(None)
    }
  }

  /** Todoを削除
    */
  def delete(id: String): Future[Boolean] = {
    val removed = storage.remove(id).isDefined
    Future.successful(removed)
  }

  /** 完了済みのTodoを全て削除
    */
  def deleteCompleted(): Future[Int] = {
    val completedIds = storage.values.filter(_.completed).map(_.id).toList
    completedIds.foreach(storage.remove)
    Future.successful(completedIds.size)
  }

  /** 全てのTodoを削除
    */
  def deleteAll(): Future[Int] = {
    val count = storage.size
    storage.clear()
    Future.successful(count)
  }

  /** Todo統計情報を取得
    */
  def getStats(): Future[TodoStats] = {
    val all = storage.values.toList
    val completed = all.count(_.completed)
    val pending = all.size - completed

    Future.successful(
      TodoStats(
        total = all.size,
        completed = completed,
        pending = pending
      )
    )
  }
}

/** Todo統計情報
  */
case class TodoStats(
    total: Int,
    completed: Int,
    pending: Int
)
