'use client'

import { useState } from 'react'
import {
  Search,
  Plus,
  KeyRound,
  Star,
  FolderOpen,
  Users,
  Trash2,
  MoreHorizontal,
  Copy,
  Pencil,
  Trash,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Eye,
  Lock,
  Menu,
  X,
} from 'lucide-react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// ── Types ──────────────────────────────────────────────────────────────
interface PasswordEntry {
  site: string
  username: string
  category: string
  lastModified: string
  strength: number
}

interface NavItem {
  label: string
  icon: React.ComponentType<{ className?: string }>
  count?: number
}

// ── Sample data ────────────────────────────────────────────────────────
const passwords: PasswordEntry[] = [
  { site: 'Google', username: 'j.doe@gmail.com', category: 'Email', lastModified: '26 Oct 2024', strength: 95 },
  { site: 'Amazon', username: 'jane_smith', category: 'Shopping', lastModified: '25 Oct 2024', strength: 88 },
  { site: 'Netflix', username: 'family.account', category: 'Streaming', lastModified: '22 Oct 2024', strength: 62 },
  { site: 'Spotify', username: 'alex.p', category: 'Music', lastModified: '20 Oct 2024', strength: 40 },
  { site: 'GitHub', username: 'd.miller@work', category: 'Development', lastModified: '18 Oct 2024', strength: 85 },
  { site: 'Twitter', username: 'social_me', category: 'Social', lastModified: '15 Oct 2024', strength: 30 },
  { site: 'Slack', username: 'gerson@company.io', category: 'Work', lastModified: '12 Oct 2024', strength: 78 },
]

const navItems: NavItem[] = [
  { label: 'All Passwords', icon: KeyRound, count: 47 },
  { label: 'Favorites', icon: Star, count: 12 },
  { label: 'Categories', icon: FolderOpen },
  { label: 'Shared', icon: Users, count: 4 },
  { label: 'Trash', icon: Trash2 },
]

// ── Helpers ────────────────────────────────────────────────────────────
function getStrengthColor(strength: number) {
  if (strength >= 80) return 'bg-emerald-500'
  if (strength >= 60) return 'bg-amber-500'
  if (strength >= 40) return 'bg-orange-500'
  return 'bg-red-500'
}

function getStrengthLabel(strength: number) {
  if (strength >= 80) return 'Strong'
  if (strength >= 60) return 'Fair'
  if (strength >= 40) return 'Weak'
  return 'Critical'
}

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    Email: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    Shopping: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    Streaming: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    Music: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    Development: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    Social: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
    Work: 'bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-300',
  }
  return colors[category] ?? 'bg-muted text-muted-foreground'
}

// ── Dashboard Component ────────────────────────────────────────────────
export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('All Passwords')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredPasswords = passwords.filter(
    (p) =>
      p.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleNavClick = (label: string) => {
    setActiveNav(label)
    setSidebarOpen(false) // close drawer on mobile after selection
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">

        {/* ── Mobile overlay ────────────────────────────────────────── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden
          />
        )}

        {/* ── Sidebar ──────────────────────────────────────────────── */}
        {/* Desktop: always visible. Mobile: slide-in drawer. */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-30 flex w-64 shrink-0 flex-col border-r border-border bg-card transition-transform duration-200 md:static md:z-auto md:w-60 md:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Close button — mobile only */}
          <button
            className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-4" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2.5 px-5 py-6">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
              <Lock className="size-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-card-foreground">
              KeyVault
            </span>
          </div>

          <Separator />

          {/* Navigation */}
          <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeNav === item.label
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="size-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count !== undefined && (
                    <span
                      className={cn(
                        'text-xs tabular-nums',
                        isActive ? 'text-primary/70' : 'text-muted-foreground/60'
                      )}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>GR</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-card-foreground">Gerson R.</span>
                <span className="text-[10px] text-muted-foreground">Free Plan</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main Content ─────────────────────────────────────────── */}
        <main className="flex flex-1 flex-col overflow-y-auto">

          {/* Top bar */}
          <header className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-6 sm:py-4">

            {/* Hamburger — mobile only */}
            <Button
              variant="ghost"
              size="icon-sm"
              className="shrink-0 md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>

            {/* Search — grows to fill space */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search passwords…"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Add button: icon-only on mobile, with label on sm+ */}
            <Button size="default" className="shrink-0">
              <Plus className="size-4" />
              <span className="hidden sm:inline">Add Password</span>
            </Button>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 sm:gap-6 sm:p-6">

            {/* ── Stats Cards ──────────────────────────────────────── */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">

              <Card size="sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-muted-foreground">Total</CardTitle>
                    <Shield className="size-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-foreground">47</p>
                  <p className="hidden text-xs text-muted-foreground sm:block">passwords saved</p>
                </CardContent>
              </Card>

              <Card size="sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-muted-foreground">Weak</CardTitle>
                    <ShieldAlert className="size-4 text-amber-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-foreground">3</p>
                    <Badge className="hidden border-0 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 sm:inline-flex">
                      Warning
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card size="sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-muted-foreground">Reused</CardTitle>
                    <ShieldCheck className="size-4 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-foreground">5</p>
                    <Badge className="hidden border-0 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 sm:inline-flex">
                      Info
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card size="sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-muted-foreground">Compromised</CardTitle>
                    <ShieldX className="size-4 text-red-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-foreground">1</p>
                    <Badge variant="destructive" className="hidden sm:inline-flex">Danger</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Password list ─────────────────────────────────────── */}
            <Card>
              <CardHeader>
                <CardTitle>Saved Passwords</CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">

                {filteredPasswords.length === 0 && (
                  <p className="py-10 text-center text-sm text-muted-foreground">
                    No passwords match your search.
                  </p>
                )}

                {/* ── Mobile card list (hidden on md+) ─────────────── */}
                {filteredPasswords.length > 0 && (
                  <ul className="divide-y divide-border md:hidden">
                    {filteredPasswords.map((entry) => (
                      <li key={entry.site} className="flex items-center gap-3 px-4 py-3">
                        <Avatar size="sm">
                          <AvatarFallback className="text-xs font-semibold">
                            {entry.site.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-medium text-foreground">
                              {entry.site}
                            </span>
                            <span
                              className={cn(
                                'hidden shrink-0 items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium sm:inline-flex',
                                getCategoryColor(entry.category)
                              )}
                            >
                              {entry.category}
                            </span>
                          </div>
                          <span className="truncate text-xs text-muted-foreground">
                            {entry.username}
                          </span>
                          {/* Strength bar */}
                          <div className="flex items-center gap-1.5 pt-1">
                            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                              <div
                                className={cn('h-full rounded-full', getStrengthColor(entry.strength))}
                                style={{ width: `${entry.strength}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-muted-foreground tabular-nums">
                              {getStrengthLabel(entry.strength)}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          <Tooltip>
                            <TooltipTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon-xs"
                                  onClick={() => handleCopy(entry.username, entry.site)}
                                />
                              }
                            >
                              <Copy className="size-3.5" />
                            </TooltipTrigger>
                            <TooltipContent>
                              {copiedId === entry.site ? 'Copied!' : 'Copy username'}
                            </TooltipContent>
                          </Tooltip>
                          <DropdownMenu>
                            <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" />}>
                              <MoreHorizontal className="size-3.5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="size-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="size-4" />
                                Copy password
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="size-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive">
                                <Trash className="size-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* ── Desktop table (hidden below md) ──────────────── */}
                {filteredPasswords.length > 0 && (
                  <Table className="hidden md:table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Site / Service</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Last Modified</TableHead>
                        <TableHead>Strength</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPasswords.map((entry) => (
                        <TableRow key={entry.site}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar size="sm">
                                <AvatarFallback className="text-xs font-semibold">
                                  {entry.site.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-foreground">{entry.site}</span>
                            </div>
                          </TableCell>

                          <TableCell className="text-muted-foreground">
                            {entry.username}
                          </TableCell>

                          <TableCell>
                            <span
                              className={cn(
                                'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                                getCategoryColor(entry.category)
                              )}
                            >
                              {entry.category}
                            </span>
                          </TableCell>

                          <TableCell className="text-muted-foreground">
                            {entry.lastModified}
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                                <div
                                  className={cn(
                                    'h-full rounded-full transition-all',
                                    getStrengthColor(entry.strength)
                                  )}
                                  style={{ width: `${entry.strength}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground tabular-nums">
                                {entry.strength}%
                              </span>
                            </div>
                          </TableCell>

                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Tooltip>
                                <TooltipTrigger
                                  render={
                                    <Button
                                      variant="ghost"
                                      size="icon-xs"
                                      onClick={() => handleCopy(entry.username, entry.site)}
                                    />
                                  }
                                >
                                  <Copy className="size-3.5" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  {copiedId === entry.site ? 'Copied!' : 'Copy username'}
                                </TooltipContent>
                              </Tooltip>
                              <DropdownMenu>
                                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" />}>
                                  <MoreHorizontal className="size-3.5" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="size-4" />
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="size-4" />
                                    Copy password
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Pencil className="size-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem variant="destructive">
                                    <Trash className="size-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}

              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}
