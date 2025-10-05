
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Clock, 
  Calendar, 
  User, 
  Tag, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";

export default function Blog() {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const blogPosts = [
    {
      id: 1,
      title: "כיצד ליישם בינה מלאכותית בהדרכה ארגונית",
      excerpt: "סקירה מקיפה של הדרכים בהן ניתן לשלב טכנולוגיות AI בתהליכי הדרכה ולמידה ארגונית, והיתרונות שהן מביאות.",
      image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=2070&auto=format&fit=crop",
      category: "בינה מלאכותית",
      author: "שניר פיינשטיין",
      date: "20 באפריל, 2023",
      readTime: "6 דקות קריאה"
    },
    {
      id: 2,
      title: "5 טרנדים מובילים בלמידה ארגונית ב-2023",
      excerpt: "סקירה של הטרנדים החמים ביותר בתחום הלמידה הארגונית השנה, מלמידה חברתית ועד טכנולוגיות VR/AR.",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070&auto=format&fit=crop",
      category: "טרנדים",
      author: "שניר פיינשטיין",
      date: "5 במרץ, 2023",
      readTime: "8 דקות קריאה"
    },
    {
      id: 3,
      title: "כיצד למדוד ROI של תכניות הדרכה",
      excerpt: "מדריך מקיף למדידת החזר ההשקעה בתכניות הדרכה ולמידה ארגונית, כולל מדדים מומלצים ושיטות מדידה.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      category: "מדידה והערכה",
      author: "שניר פיינשטיין",
      date: "18 בפברואר, 2023",
      readTime: "10 דקות קריאה"
    },
    {
      id: 4,
      title: "גיימיפיקציה בהדרכה: מעבר למשחק",
      excerpt: "איך לשלב אלמנטים של גיימיפיקציה בתכניות ההדרכה שלכם בצורה אפקטיבית שתגביר מעורבות ותוצאות.",
      image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=2070&auto=format&fit=crop",
      category: "גיימיפיקציה",
      author: "שניר פיינשטיין",
      date: "3 בינואר, 2023",
      readTime: "7 דקות קריאה"
    },
    {
      id: 5,
      title: "בניית קהילות למידה אפקטיביות בארגון",
      excerpt: "מדריך מעשי לבניית קהילות למידה ארגוניות שמעודדות שיתוף ידע, למידה הדדית וחדשנות.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop",
      category: "קהילות למידה",
      author: "שניר פיינשטיין",
      date: "15 בדצמבר, 2022",
      readTime: "9 דקות קריאה"
    },
    {
      id: 6,
      title: "צ'אטבוטים בשירות ההדרכה והלמידה",
      excerpt: "כיצד צ'אטבוטים מבוססי AI יכולים לשפר את חווית הלמידה, לחסוך זמן ולהגביר את אפקטיביות ההדרכה.",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070&auto=format&fit=crop",
      category: "בינה מלאכותית",
      author: "שניר פיינשטיין",
      date: "30 בנובמבר, 2022",
      readTime: "6 דקות קריאה"
    }
  ];

  const filteredPosts = blogPosts.filter(post => 
    post.title.includes(searchQuery) || 
    post.excerpt.includes(searchQuery) || 
    post.category.includes(searchQuery)
  );

  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">בלוג</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              תובנות ועדכונים בעולם ההדרכה, הלמידה והטכנולוגיה
            </h1>
            <p className="text-lg md:text-xl text-[#233071] mb-8">
              מאמרים, טיפים ומחקרים עדכניים בתחומי הדרכה, למידה ויישום טכנולוגיות AI
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="חפש מאמרים..."
                className="pl-10 pr-14 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="md:col-span-8">
              <div className="grid gap-8">
                {filteredPosts.length > 0 ? (
                  <>
                    {/* Featured Post */}
                    {!searchQuery && (
                      <div className="mb-8">
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                          <div className="md:flex">
                            <div className="md:w-2/5">
                              <div className="h-64 md:h-full relative overflow-hidden">
                                <img 
                                  src={filteredPosts[0].image} 
                                  alt={filteredPosts[0].title} 
                                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                                />
                              </div>
                            </div>
                            <div className="md:w-3/5 p-6">
                              <Badge className="mb-2">{filteredPosts[0].category}</Badge>
                              <h2 className="text-2xl font-bold mb-3">{filteredPosts[0].title}</h2>
                              <p className="text-[#233071] mb-4">{filteredPosts[0].excerpt}</p>
                              
                              <div className="flex flex-wrap text-sm text-gray-500 mb-4 space-x-4 space-x-reverse">
                                <div className="flex items-center">
                                  <User className="h-4 w-4 ml-1" />
                                  {filteredPosts[0].author}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 ml-1" />
                                  {filteredPosts[0].date}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 ml-1" />
                                  {filteredPosts[0].readTime}
                                </div>
                              </div>
                              
                              <Button variant="default" className="gap-2">
                                קרא עוד
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </div>
                    )}
                    
                    {/* Regular Posts */}
                    <div className="grid sm:grid-cols-2 gap-8">
                      {filteredPosts.slice(searchQuery ? 0 : 1).map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex justify-center mt-12">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button variant="outline" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="bg-blue-50">1</Button>
                        <Button variant="outline">2</Button>
                        <Button variant="outline">3</Button>
                        <Button variant="outline" size="icon">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-[#233071] mb-2">לא נמצאו תוצאות</h3>
                    <p className="text-[#233071]">נסה לחפש מונחים אחרים או לעיין בכל המאמרים</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchQuery("")}
                    >
                      הצג את כל המאמרים
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-4">
              <div className="space-y-8">
                {/* Categories */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">קטגוריות</h3>
                    <div className="space-y-2">
                      {categories.map((category, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between cursor-pointer hover:text-blue-800 transition-colors py-2 border-b border-gray-100"
                          onClick={() => setSearchQuery(category)}
                        >
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 ml-2 text-blue-500" />
                            {category}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {blogPosts.filter(post => post.category === category).length}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Popular Posts */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">מאמרים פופולריים</h3>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 3).map((post) => (
                        <div key={post.id} className="flex items-start space-x-4 space-x-reverse">
                          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1 hover:text-blue-800 cursor-pointer">{post.title}</h4>
                            <div className="text-xs text-gray-500 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {post.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Newsletter */}
                <Card className="bg-blue-50 border-none">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">הישאר מעודכן</h3>
                    <p className="text-sm text-[#233071] mb-4">
                      הרשם לניוזלטר שלנו וקבל עדכונים שבועיים על טרנדים בעולם ההדרכה והלמידה
                    </p>
                    <div className="space-y-2">
                      <Input placeholder="האימייל שלך" className="bg-white" />
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">הרשם לניוזלטר</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              רוצה לקבל ייעוץ אישי?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              אני כאן כדי לעזור לך לפתח את מערך ההדרכה והלמידה הארגונית שלך
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={createPageUrl("Schedule")}>
                <Button className="bg-white text-blue-800 hover:bg-blue-50 text-lg px-6 py-6">
                  <Calendar className="h-5 w-5 ml-2" />
                  קבע פגישת ייעוץ
                </Button>
              </Link>
              <Link to={createPageUrl("Contact")}>
                <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-6 py-6">
                  צור קשר עכשיו
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Blog Post Card Component
const BlogPostCard = ({ post }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
    <div className="h-48 overflow-hidden">
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
      />
    </div>
    <CardContent className="p-6">
      <Badge className="mb-2">{post.category}</Badge>
      <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
      <p className="text-[#233071] mb-4 line-clamp-3">{post.excerpt}</p>
      
      <div className="flex flex-wrap text-sm text-gray-500 mb-4 space-x-4 space-x-reverse">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 ml-1" />
          {post.date}
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 ml-1" />
          {post.readTime}
        </div>
      </div>
      
      <Button variant="outline" className="w-full gap-2">
        קרא עוד
        <ArrowRight className="h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);
