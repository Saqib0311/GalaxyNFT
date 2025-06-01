
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageCircle, Calendar, Trophy, Plus } from 'lucide-react';
import Header from '@/components/Header';

const Community = () => {
  const [newPost, setNewPost] = useState('');

  const discussions = [
    {
      id: 1,
      title: "What makes an NFT valuable?",
      author: "CryptoEnthusiast",
      replies: 23,
      likes: 45,
      timestamp: "2h ago",
      category: "Discussion"
    },
    {
      id: 2,
      title: "Best practices for NFT collectors",
      author: "ArtCollector99",
      replies: 18,
      likes: 32,
      timestamp: "4h ago",
      category: "Tips"
    },
    {
      id: 3,
      title: "Upcoming NFT drops this week",
      author: "NFTTracker",
      replies: 67,
      likes: 89,
      timestamp: "6h ago",
      category: "News"
    }
  ];

  const events = [
    {
      id: 1,
      title: "NFT Art Contest",
      description: "Submit your best digital art for a chance to win 5 ETH",
      date: "Dec 25, 2024",
      participants: 245,
      prize: "5 ETH",
      status: "active"
    },
    {
      id: 2,
      title: "Community AMA",
      description: "Ask anything about NFTs and blockchain technology",
      date: "Dec 28, 2024",
      participants: 89,
      prize: "Knowledge",
      status: "upcoming"
    }
  ];

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    console.log('Creating post:', newPost);
    setNewPost('');
    alert('Post created successfully!');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            NFT <span className="gradient-text">Community</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Connect with fellow collectors, creators, and enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Create Post */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4">Share with the community</h3>
              <div className="space-y-4">
                <Textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind? Share your thoughts about NFTs..."
                  rows={3}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleCreatePost}
                    className="bg-cosmic-gradient hover:opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>

            {/* Discussions */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-6 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-galaxy-cyan" />
                Recent Discussions
              </h3>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-medium mb-1">{discussion.title}</h4>
                        <p className="text-white/60 text-sm">by {discussion.author} • {discussion.timestamp}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-galaxy-purple/20 text-galaxy-purple rounded">
                        {discussion.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <span>{discussion.replies} replies</span>
                      <span>{discussion.likes} likes</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  View All Discussions
                </Button>
              </div>
            </div>

            {/* Events */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-galaxy-pink" />
                Community Events
              </h3>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-white font-medium mb-1">{event.title}</h4>
                        <p className="text-white/70 text-sm mb-2">{event.description}</p>
                        <p className="text-white/60 text-sm">{event.date}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        event.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {event.participants} joined
                        </span>
                        <span className="flex items-center">
                          <Trophy className="w-4 h-4 mr-1" />
                          Prize: {event.prize}
                        </span>
                      </div>
                      <Button size="sm" className="bg-cosmic-gradient hover:opacity-90">
                        Join Event
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Total Members</span>
                  <span className="text-white font-bold">24,567</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Active Today</span>
                  <span className="text-white font-bold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Discussions</span>
                  <span className="text-white font-bold">5,678</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Events Hosted</span>
                  <span className="text-white font-bold">89</span>
                </div>
              </div>
            </div>

            {/* Top Contributors */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4">Top Contributors</h3>
              <div className="space-y-3">
                {['CryptoArtist', 'NFTCollector', 'BlockchainGuru'].map((contributor, index) => (
                  <div key={contributor} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cosmic-gradient rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{contributor}</p>
                      <p className="text-white/60 text-sm">{1000 - index * 100} points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4">Community Guidelines</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>• Be respectful to all members</li>
                <li>• No spam or self-promotion</li>
                <li>• Share valuable insights</li>
                <li>• Help newcomers learn</li>
                <li>• Follow platform rules</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
