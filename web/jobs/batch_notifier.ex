defmodule Danton.BatchNotifier do
  def run do
    Danton.Notification.for_batch_notification() |> Enum.each(&notify_user/1)
  end

  defp notify_user(notification_by_user = {user_id, notifications}) do
    # this should maybe just dispatch a post event if there is only one
    # but we can optimize this later
    posts_waiting = Enum.count(notifications, &(&1.type == "post"))
    messages_waiting = Enum.count(notifications, &(&1.type == "message"))

    Danton.Communication.notify_user(
      user_id,
      :batch_notification,
      %{
        posts_waiting: posts_waiting,
        messages_waiting: messages_waiting
      }
    )
  end
end
