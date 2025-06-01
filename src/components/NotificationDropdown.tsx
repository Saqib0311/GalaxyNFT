
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "NFT Sold!",
      message: "Your 'Cosmic Explorer #1234' has been sold for 2.5 ETH",
      timestamp: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "New Bid",
      message: "Someone placed a bid on your 'Galaxy Warrior'",
      timestamp: "5 hours ago",
      read: false
    },
    {
      id: 3,
      title: "Collection Updated",
      message: "New items added to Cosmic Apes collection",
      timestamp: "1 day ago",
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-white/80 hover:text-white relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-galaxy-deep/95 backdrop-blur-xl border border-white/30 rounded-lg shadow-2xl z-50">
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">Notifications</h3>
                <div className="flex items-center space-x-2">
                  {notifications.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white/60 hover:text-white text-xs h-6 px-2"
                      onClick={clearAll}
                    >
                      Clear All
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white/60 hover:text-white w-6 h-6"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/60 font-medium">You have no notifications</p>
                  <p className="text-white/40 text-sm mt-1">When you get notifications, they'll appear here</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 border-b border-white/10 hover:bg-white/10 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-white/5' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        !notification.read ? 'bg-galaxy-cyan' : 'bg-transparent'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm mb-1 truncate">
                          {notification.title}
                        </h4>
                        <p className="text-white/70 text-sm mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-white/50 text-xs">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {notifications.length > 0 && (
              <div className="p-3 border-t border-white/20 text-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-galaxy-cyan hover:text-white text-xs"
                  onClick={() => setIsOpen(false)}
                >
                  View All Notifications
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
