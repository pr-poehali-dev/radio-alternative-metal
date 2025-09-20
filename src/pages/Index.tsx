import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import AudioPlayer from "@/components/AudioPlayer";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const navItems = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "music", label: "Музыка", icon: "Music" },
    { id: "bio", label: "Биография", icon: "User" },
    { id: "gallery", label: "Галерея", icon: "Image" },
    { id: "news", label: "Новости", icon: "Newspaper" },
    { id: "contact", label: "Контакты", icon: "Mail" },
  ];

  const tracks = [
    { title: "Electric Outro35", artist: "TheRadioMIG", genre: "Alt Metal", duration: "3:42", isNew: true },
    { title: "Electric Tulip Busto", artist: "TheRadioMIG", genre: "Rap-Trap", duration: "4:15", isNew: true },
    { title: "Lato Trap", artist: "TheRadioMIG", genre: "Alt Metal", duration: "3:28", isNew: false },
    { title: "Neon Dreams", artist: "TheRadioMIG", genre: "Rap-Trap", duration: "4:01", isNew: false },
  ];

  const handlePlayTrack = (trackIndex: number) => {
    setCurrentTrack(trackIndex);
    setIsPlaying(true);
    setShowPlayer(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    const nextTrack = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextTrack);
  };

  const handlePreviousTrack = () => {
    const prevTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prevTrack);
  };

  const renderContent = () => {
    switch (currentSection) {
      case "home":
        return (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(rgba(26, 31, 44, 0.7), rgba(26, 31, 44, 0.7)), url('img/098ea40b-6e4d-460d-aa2e-26ed5065a3aa.jpg')`
                }}
              />
              <div className="relative z-10 text-center space-y-8 px-4">
                <h1 className="text-6xl md:text-8xl font-heading font-black text-white leading-tight">
                  THERADIOMIG
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
                  Альтернативный метал встречается с рэп-трэпом
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    onClick={() => handlePlayTrack(0)}
                    className="bg-gradient-to-r from-electric-orange to-primary text-white font-heading font-bold px-8 py-6 text-lg hover:scale-105 transition-all duration-300"
                  >
                    <Icon name="Play" className="mr-2" size={20} />
                    Слушать сейчас
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white font-heading font-bold px-8 py-6 text-lg transition-all duration-300"
                  >
                    <Icon name="Download" className="mr-2" size={20} />
                    Скачать треки
                  </Button>
                </div>
              </div>
            </section>

            {/* Latest Releases */}
            <section className="px-4 md:px-8">
              <h2 className="text-4xl font-heading font-bold text-white mb-8 text-center">
                Последние релизы
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {tracks.map((track, index) => (
                  <Card key={index} className="bg-card border-2 border-purple-accent/20 hover:border-electric-orange/50 transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-heading font-bold text-white">
                              {track.title}
                            </h3>
                            {track.isNew && (
                              <span className="bg-gradient-to-r from-electric-orange to-primary text-white text-xs px-2 py-1 rounded-full font-bold">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400">{track.genre}</p>
                          <p className="text-sm text-gray-500">{track.duration}</p>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handlePlayTrack(index)}
                          className="bg-electric-orange hover:bg-electric-orange/80 text-white rounded-full w-12 h-12 p-0"
                        >
                          <Icon name={isPlaying && currentTrack === index ? "Pause" : "Play"} size={20} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        );

      case "music":
        return (
          <div className="px-4 md:px-8 space-y-8">
            <h2 className="text-4xl font-heading font-bold text-white mb-8 text-center">
              Музыка
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tracks.map((track, index) => (
                <Card key={index} className="bg-card border-2 border-purple-accent/20 hover:border-electric-orange/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="w-full h-32 bg-gradient-to-br from-electric-orange to-secondary rounded-lg flex items-center justify-center">
                        <Icon name="Music" size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-bold text-white">{track.title}</h3>
                        <p className="text-gray-400">{track.genre}</p>
                        <p className="text-sm text-gray-500">{track.duration}</p>
                      </div>
                      <Button 
                        onClick={() => handlePlayTrack(index)}
                        className="w-full bg-electric-orange hover:bg-electric-orange/80 text-white"
                      >
                        <Icon name={isPlaying && currentTrack === index ? "Pause" : "Play"} className="mr-2" size={16} />
                        {isPlaying && currentTrack === index ? "Пауза" : "Играть"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "bio":
        return (
          <div className="px-4 md:px-8 max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-heading font-bold text-white mb-8 text-center">
              Биография
            </h2>
            <Card className="bg-card border-2 border-purple-accent/20">
              <CardContent className="p-8">
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    TheRadioMIG — это проект молодого музыканта, вдохновленного звучанием классического альтернативного метала и современным ритмом хип-хопа.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Его творчество сочетает в себе мощь гитарных риффов, энергичные битбоксовые ритмы и эмоциональные тексты, раскрывающие жизнь молодежи, мечты и внутренние переживания автора.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Каждый трек наполнен энергией и искренностью, погружаясь в атмосферу глубоких эмоций и драйва. Если ты ценишь оригинальность, смелость экспериментирования и жаждешь услышать музыку, отражающую твоё настроение и чувства, тогда TheRadioMIG именно тот артист, которого ты искал.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "gallery":
        return (
          <div className="px-4 md:px-8 space-y-8">
            <h2 className="text-4xl font-heading font-bold text-white mb-8 text-center">
              Галерея
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} className="bg-card border-2 border-purple-accent/20 hover:border-electric-orange/50 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="w-full h-64 bg-gradient-to-br from-electric-orange to-secondary rounded-lg flex items-center justify-center">
                      <Icon name="Camera" size={32} className="text-white" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "news":
        return (
          <div className="px-4 md:px-8 max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-heading font-bold text-white mb-8 text-center">
              Новости
            </h2>
            <div className="space-y-6">
              {[
                { title: "Новый трек 'Electric Outro35' уже доступен!", date: "15 сентября 2025" },
                { title: "Анонс предстоящего альбома", date: "10 сентября 2025" },
                { title: "Концерт в Москве - билеты в продаже", date: "5 сентября 2025" },
              ].map((news, index) => (
                <Card key={index} className="bg-card border-2 border-purple-accent/20 hover:border-electric-orange/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading font-bold text-white mb-2">{news.title}</h3>
                    <p className="text-gray-400">{news.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="px-4 md:px-8 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-heading font-bold text-white mb-8 text-center">
              Контакты
            </h2>
            <Card className="bg-card border-2 border-purple-accent/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Icon name="Mail" className="text-electric-orange" size={24} />
                    <span className="text-white">info@theradiomig.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Icon name="Instagram" className="text-electric-orange" size={24} />
                    <span className="text-white">@theradiomig</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Icon name="Youtube" className="text-electric-orange" size={24} />
                    <span className="text-white">TheRadioMIG Official</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Icon name="Music" className="text-electric-orange" size={24} />
                    <span className="text-white">Spotify, Apple Music, SoundCloud</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-md border-b border-purple-accent/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-heading font-black text-xl text-white">
              THERADIOMIG
            </div>
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`flex items-center space-x-2 transition-colors duration-300 ${
                    currentSection === item.id
                      ? "text-electric-orange"
                      : "text-gray-300 hover:text-electric-orange"
                  }`}
                >
                  <Icon name={item.icon as any} size={16} />
                  <span className="font-heading font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <Icon name="Menu" className="text-white" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-16">
        {renderContent()}
      </main>

      {/* Audio Player */}
      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
          <AudioPlayer
            track={tracks[currentTrack]}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNextTrack}
            onPrevious={handlePreviousTrack}
          />
        </div>
      )}

      {/* Footer */}
      <footer className={`bg-dark-bg border-t border-purple-accent/20 py-8 mt-16 ${showPlayer ? 'mb-32' : ''}`}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 TheRadioMIG. Присоединяйся к сообществу поклонников настоящей музыки!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;