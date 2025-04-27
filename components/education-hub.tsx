"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Search, Play, CheckCircle, Bookmark, Share2, ThumbsUp, Filter, Clock } from "lucide-react"
import { useNotification } from "@/components/ui/notification-toast"

export function EducationHub() {
  const [activeTab, setActiveTab] = useState("articles")
  const [searchQuery, setSearchQuery] = useState("")
  const [savedArticles, setSavedArticles] = useState<string[]>([])
  const [completedCourses, setCompletedCourses] = useState<string[]>([])
  const { addNotification } = useNotification()

  // Sample educational content
  const articles = [
    {
      id: "a1",
      title: "The Ultimate Guide to Plastic Recycling",
      description: "Learn how to properly recycle different types of plastic and understand recycling symbols.",
      category: "recycling",
      readTime: "8 min read",
      image: "/placeholder.svg?height=200&width=400",
      date: "2023-10-15",
      featured: true,
    },
    {
      id: "a2",
      title: "Composting 101: Turn Food Waste into Garden Gold",
      description: "A beginner's guide to starting your own compost pile and reducing organic waste.",
      category: "organic",
      readTime: "12 min read",
      image: "/placeholder.svg?height=200&width=400",
      date: "2023-10-10",
    },
    {
      id: "a3",
      title: "E-Waste: The Growing Problem and Solutions",
      description: "Understanding the environmental impact of electronic waste and how to dispose of it properly.",
      category: "e-waste",
      readTime: "10 min read",
      image: "/placeholder.svg?height=200&width=400",
      date: "2023-10-05",
    },
    {
      id: "a4",
      title: "Zero Waste Living: Simple Steps to Reduce Your Footprint",
      description:
        "Practical tips and strategies for reducing waste in your daily life and moving towards a zero waste lifestyle.",
      category: "lifestyle",
      readTime: "15 min read",
      image: "/placeholder.svg?height=200&width=400",
      date: "2023-09-28",
    },
    {
      id: "a5",
      title: "Understanding Recycling Symbols and Labels",
      description: "A comprehensive guide to decoding recycling symbols and product labels for better waste sorting.",
      category: "recycling",
      readTime: "7 min read",
      image: "/placeholder.svg?height=200&width=400",
      date: "2023-09-20",
    },
  ]

  const courses = [
    {
      id: "c1",
      title: "Master Recycling Course",
      description: "A comprehensive course covering all aspects of recycling from sorting to processing.",
      category: "recycling",
      duration: "3 hours",
      modules: 8,
      image: "/placeholder.svg?height=200&width=400",
      progress: 65,
      featured: true,
    },
    {
      id: "c2",
      title: "Sustainable Living Fundamentals",
      description: "Learn the basics of sustainable living and how to reduce your environmental impact.",
      category: "lifestyle",
      duration: "2.5 hours",
      modules: 6,
      image: "/placeholder.svg?height=200&width=400",
      progress: 100,
    },
    {
      id: "c3",
      title: "Composting Masterclass",
      description: "Everything you need to know about composting, from setup to maintenance.",
      category: "organic",
      duration: "1.5 hours",
      modules: 5,
      image: "/placeholder.svg?height=200&width=400",
      progress: 0,
    },
    {
      id: "c4",
      title: "Waste Reduction Strategies for Businesses",
      description: "Practical strategies for businesses to reduce waste and save money.",
      category: "business",
      duration: "4 hours",
      modules: 10,
      image: "/placeholder.svg?height=200&width=400",
      progress: 30,
    },
  ]

  const videos = [
    {
      id: "v1",
      title: "How to Set Up a Home Recycling System",
      description: "A step-by-step guide to creating an efficient recycling system in your home.",
      category: "recycling",
      duration: "12:45",
      image: "/placeholder.svg?height=200&width=400",
      views: 15420,
      featured: true,
    },
    {
      id: "v2",
      title: "The Journey of Recycled Plastic",
      description: "Follow the journey of a plastic bottle from your recycling bin to its new life.",
      category: "recycling",
      duration: "18:30",
      image: "/placeholder.svg?height=200&width=400",
      views: 8750,
    },
    {
      id: "v3",
      title: "DIY Compost Bin Tutorial",
      description: "Learn how to build your own compost bin using simple materials.",
      category: "organic",
      duration: "15:20",
      image: "/placeholder.svg?height=200&width=400",
      views: 12300,
    },
    {
      id: "v4",
      title: "5 Common Recycling Mistakes to Avoid",
      description: "Avoid these common mistakes that can contaminate recycling streams.",
      category: "recycling",
      duration: "08:15",
      image: "/placeholder.svg?height=200&width=400",
      views: 23100,
    },
  ]

  // Filter content based on search query
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSaveArticle = (id: string) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter((articleId) => articleId !== id))
      addNotification({
        title: "Article Removed",
        description: "The article has been removed from your saved items.",
        type: "info",
        duration: 3000,
      })
    } else {
      setSavedArticles([...savedArticles, id])
      addNotification({
        title: "Article Saved",
        description: "The article has been saved to your library for later reading.",
        type: "success",
        duration: 3000,
      })
    }
  }

  const markCourseCompleted = (id: string) => {
    if (completedCourses.includes(id)) {
      setCompletedCourses(completedCourses.filter((courseId) => courseId !== id))
    } else {
      setCompletedCourses([...completedCourses, id])
      addNotification({
        title: "Course Completed",
        description: "Congratulations! You've completed the course.",
        type: "success",
        duration: 3000,
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <BookOpen className="mr-2 h-5 w-5" />
          Recycling Education Hub
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Learn about recycling, waste reduction, and sustainable living
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Tabs defaultValue="articles" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="w-full grid grid-cols-3 sm:w-auto sm:flex">
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search content..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="articles" className="mt-0 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden flex flex-col h-full">
                    <div className="relative h-40 sm:h-48">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Badge className="bg-primary text-[10px] sm:text-xs">{article.category}</Badge>
                        {article.featured && <Badge className="bg-amber-500 text-[10px] sm:text-xs">Featured</Badge>}
                      </div>
                    </div>
                    <CardHeader className="pb-2 px-4 sm:px-6">
                      <CardTitle className="text-base sm:text-lg line-clamp-2">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2 px-4 sm:px-6 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{article.description}</p>
                      <div className="flex items-center justify-between mt-4 text-[10px] sm:text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{article.readTime}</span>
                        </div>
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 px-4 sm:px-6">
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        Read Article
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleSaveArticle(article.id)}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${savedArticles.includes(article.id) ? "fill-primary text-primary" : ""}`}
                        />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <h3 className="text-base sm:text-lg font-medium">No articles found</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Try adjusting your search or browse our featured content.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-0 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden flex flex-col h-full">
                    <div className="relative h-40 sm:h-48">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Badge className="bg-primary text-[10px] sm:text-xs">{course.category}</Badge>
                        {course.featured && <Badge className="bg-amber-500 text-[10px] sm:text-xs">Featured</Badge>}
                      </div>
                    </div>
                    <CardHeader className="pb-2 px-4 sm:px-6">
                      <CardTitle className="text-base sm:text-lg line-clamp-2">{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2 px-4 sm:px-6 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{course.description}</p>
                      <div className="flex items-center justify-between mt-4 text-[10px] sm:text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{course.duration}</span>
                        </div>
                        <span>{course.modules} modules</span>
                      </div>

                      <div className="mt-4 space-y-1">
                        <div className="flex justify-between text-[10px] sm:text-xs">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 px-4 sm:px-6">
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        {course.progress === 0
                          ? "Start Course"
                          : course.progress === 100
                            ? "Review Course"
                            : "Continue"}
                      </Button>
                      {course.progress === 100 ? (
                        <Badge className="bg-green-500 h-6 text-[10px] sm:text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => markCourseCompleted(course.id)}
                        >
                          Mark as Completed
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <h3 className="text-base sm:text-lg font-medium">No courses found</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Try adjusting your search or browse our featured courses.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-0 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden flex flex-col h-full">
                    <div className="relative h-40 sm:h-48">
                      <img
                        src={video.image || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-2 sm:p-3">
                          <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] sm:text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Badge className="bg-primary text-[10px] sm:text-xs">{video.category}</Badge>
                        {video.featured && <Badge className="bg-amber-500 text-[10px] sm:text-xs">Featured</Badge>}
                      </div>
                    </div>
                    <CardHeader className="pb-2 px-4 sm:px-6">
                      <CardTitle className="text-base sm:text-lg line-clamp-2">{video.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2 px-4 sm:px-6 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{video.description}</p>
                      <div className="flex items-center mt-4 text-[10px] sm:text-xs text-muted-foreground">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        <span>{video.views.toLocaleString()} views</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 px-4 sm:px-6">
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        Watch Video
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <h3 className="text-base sm:text-lg font-medium">No videos found</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Try adjusting your search or browse our featured videos.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 border-t pt-4 px-4 sm:px-6">
        <div className="text-xs sm:text-sm text-muted-foreground">
          {filteredArticles.length} articles, {filteredCourses.length} courses, {filteredVideos.length} videos
        </div>
        <Button
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => {
            addNotification({
              title: "Content Updated",
              description: "New educational content has been added to the hub.",
              type: "info",
              duration: 3000,
            })
          }}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter Content
        </Button>
      </CardFooter>
    </Card>
  )
}
